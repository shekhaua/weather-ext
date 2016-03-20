<div class="header">
    <%= weekday %>
</div>
<div class="day">
    <i class="wi wi-wu-<%= dayForecast.icon %>"></i>
    <span class="temp"><%= highTemp.celsius %><span>&deg;</span></span>
</div>
<div class="night">
    <i class="wi wi-wu-<%= nightForecast.icon %>"></i>
    <span class="temp"><%= lowTemp.celsius %><span>&deg;</span></span>
</div>
<div class="footer">
    <%= day %><span>/</span><span class="month"><%= monthNameShort%></span><span>/</span><%= year %>
</div>