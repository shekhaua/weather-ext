<div class="header">
    <div class="wrap">
        <div class="label">Today</div>
        <div class="date">
            <span class="day-month"><%= dayMonth() %></span>
            <span class="year"><%= year() %></span>
        </div>

    </div>
</div>
<div class="time"><%= clock() %></div>
<div class="conditions">
    <img src="<%= iconUrl %>"/>
    <p class="temp"><%= tempC %><span>&deg;</span></p>
    <p class="description"><%= weather %></p>
</div>