# while, do

Source: https://zorro-project.com/manual/en/while.htm

while, do


## while (comparison) { instructions... }


## do { instructions... } while (comparison)

;


		Repeats
  all instructions between the winged brackets as long as the [comparison](comparisions.htm) between
		the round brackets is true or evaluates to non-zero. This repetition
		of instructions is called a loop. The **while** statement
		evaluates the comparison at the begin, the **do..while** statement at the end of each repetition.

### Remarks:


- If you
		  want the loop to run forever, simply use the
		  value 1 for
		  the comparison - 1 is always true.

- Loops can be prematurely terminated by [break](acrt-break.htm), and prematurely repeated
            by [continue](acrt-continue.htm).

-   The winged brackets can be omitted when the loop contains only one
          instruction.


### Example:


```

x = 0;
while(x < 100) *// repeat while x is lower than 100*
  x += 1;

```


### See also:

[if](if.htm), [for](for.htm), [break](acrt-break.htm), [continue](acrt-continue.htm), [comparisons](comparisions.htm), [loop](loop.htm)


  [► latest
  version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
