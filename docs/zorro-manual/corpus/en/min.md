# min, max

Source: https://zorro-project.com/manual/en/min.htm

min, max


## min(int x, int y): int


## min(var x, var y): var


## max(int x, int y): int


## max(var x, var y): var

		Returns the minimum or maximum of **x** and **y**.

### Parameters:

		**x**,**y**      - any **var** or **int**.


### Returns:

		The minimum or maximum of **x** and **y**.

### Remarks:

		The returned variable type depends on the type of the arguments; for constants use a decimal point to mark them as **var** (f.i. **1** is **int**, but **1.** is **var**).

### Example:


```
var x = max(0.,y);
```


### See also:

  [abs](abs.htm), [between](between.htm), [ifelse](ifelse.htm),
[MinVal](transform.htm), [MaxVal](transform.htm)


            [► latest
    version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
