 // Current Date and Time Display
 function updateDateTime() {
    const now = new Date();
    
    // Format time
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Format date
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update DOM
    document.getElementById('currentTime').textContent = timeString;
    document.getElementById('currentDate').textContent = dateString;
}

// Update time every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Calendar Data - Sample events
const events = [
    {
        date: new Date(2025, 9, 25), // November 15, 2023 (month is 0-indexed)
        title: "Minds Over AI - MIL in digital sapces",
        time: "2:00 PM - 3:30 PM",
        location: "Online"
    }
];

// Calendar Variables
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Calendar Functions
function generateCalendar(month, year) {
    const calendarDays = document.getElementById('calendarDays');
    const calendarTitle = document.getElementById('calendarTitle');
    
    // Clear previous calendar
    calendarDays.innerHTML = '';
    
    // Update calendar title
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    calendarTitle.textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get previous month's total days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Add empty days for previous month
    for (let i = firstDayIndex; i > 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day empty';
        const dayNumber = prevMonthLastDay - i + 1;
        dayElement.innerHTML = `<div class="day-number">${dayNumber}</div>`;
        calendarDays.appendChild(dayElement);
    }
    
    // Add current month days
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    
    for (let i = 1; i <= totalDays; i++) {
        const dayElement = document.createElement('div');
        const dayDate = new Date(year, month, i);
        
        // Check if this is today
        const isToday = isCurrentMonth && i === today.getDate();
        
        // Check if this day has an event
        const dayEvents = events.filter(event => 
            event.date.getDate() === i &&
            event.date.getMonth() === month &&
            event.date.getFullYear() === year
        );
        
        // Check if this is the main event day (November 25)
        const isEventDay = i === 25 && month === 9 && year === 2025;
        
        // Set day classes
        let dayClass = 'day';
        if (isToday) dayClass += ' today';
        if (isEventDay) dayClass += ' event-day';
        if (dayEvents.length > 0) dayClass += ' has-event';
        
        dayElement.className = dayClass;
        dayElement.innerHTML = `<div class="day-number">${i}</div>`;
        
        // Add event tooltip if there are events
        if (dayEvents.length > 0) {
            const tooltip = document.createElement('div');
            tooltip.className = 'event-tooltip';
            
            let tooltipContent = `<h5>${dayEvents[0].title}</h5>`;
            tooltipContent += `<p><i class="far fa-clock"></i> ${dayEvents[0].time}</p>`;
            tooltipContent += `<p><i class="fas fa-map-marker-alt"></i> ${dayEvents[0].location}</p>`;
            
            if (dayEvents.length > 1) {
                tooltipContent += `<p style="margin-top: 5px; font-style: italic;">+ ${dayEvents.length - 1} more event(s)</p>`;
            }
            
            tooltip.innerHTML = tooltipContent;
            dayElement.appendChild(tooltip);
        }
        
        calendarDays.appendChild(dayElement);
    }
    
    // Calculate total cells needed (should be 42 for 6 weeks)
    const totalCells = 42;
    const cellsUsed = firstDayIndex + totalDays;
    const nextMonthDays = totalCells - cellsUsed;
    
    // Add empty days for next month
    for (let i = 1; i <= nextMonthDays; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day empty';
        dayElement.innerHTML = `<div class="day-number">${i}</div>`;
        calendarDays.appendChild(dayElement);
    }
}

// Navigation Functions
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

function goToToday() {
    currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    generateCalendar(currentMonth, currentYear);
}

// Initialize Calendar
document.addEventListener('DOMContentLoaded', function() {
    // Generate initial calendar
    generateCalendar(currentMonth, currentYear);
    
    // Add event listeners
    document.getElementById('prevMonth').addEventListener('click', prevMonth);
    document.getElementById('nextMonth').addEventListener('click', nextMonth);
    document.getElementById('todayBtn').addEventListener('click', goToToday);
});