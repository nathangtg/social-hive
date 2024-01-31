@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Social Hive')
<img src="https://i.ibb.co/NZPLHf3/Social-Hive-transformed.png" class="logo" alt="Social Hive">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
