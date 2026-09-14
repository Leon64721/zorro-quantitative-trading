# continue

Source: https://zorro-project.com/manual/en/acrt-continue.htm

continue


## continue

		Jumps to the begin of a **[while](while.htm)** loop or

the continuation part of a [for](for.htm) loop.

### Example:


```
int x = 0;
int y = 0;
while (x < 100)
{
 	x+=1;
 	if(x % 2) *// only odd numbers*
 	  continue; *// loop continuing from the start*
 	y += x; *// all odd numbers up to 100 will be sum*
}
```


 See also:
		[](while.htm)[while](while.htm),  [for](for.htm), [break](acrt-break.htm)


[► latest
version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
