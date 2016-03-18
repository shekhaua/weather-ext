<div class="header">
    <%= weekday %>
</div>
<div class="day">
    <img src="https://icons.wxug.com/i/c/i/<%= dayForecast.icon %>.gif"/>
    <span class="temp"><%= highTemp.celsius %><span>&deg;</span></span>
</div>
<div class="night">
    <img src="https://icons.wxug.com/i/c/i/<%= nightForecast.icon %>.gif"/>
    <span class="temp"><%= lowTemp.celsius %><span>&deg;</span></span>
</div>
<div class="footer">
    <%= day %><span>/</span><span class="month"><%= monthNameShort%></span><span>/</span><%= year %>
</div>