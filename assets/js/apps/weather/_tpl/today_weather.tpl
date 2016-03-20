<div class="header">
    <div class="wrap clearfix">
        <div class="label">Today</div>
        <div class="date">
            <span class="day-month"><%= dayMonth() %></span>
            <span class="year"><%= year() %></span>
        </div>

    </div>
</div>
<div class="time"><%= clock() %></div>
<div class="conditions">
    <i class="wi wi-wu-<%= current_observation.icon %>"></i>
    <p class="temp"><%= current_observation.temp_c %><span>&deg;</span></p>
    <p class="description"><%= current_observation.weather %></p>
</div>