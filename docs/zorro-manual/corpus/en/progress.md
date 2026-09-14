# progress

Source: https://zorro-project.com/manual/en/progress.htm

progress


## progress (int n1, int n2): int

Displays a red/green progress bar during a [Test] run.
Prevents unresponsiveness during long computations or external function calls.

### Parameters:


             | **n1**
             |

Length of the first part of the progress bar in percent. Green when > 0, red when < 0.


             | **n2**
             |

Length of the second part of the progress bar in percent; green when > 0, red when < 0, 0 for a neutral bar color.


###


  Returns:

  0 when the [Stop] key was hit, nonzero otherwise.

### Remarks:


- If **n1** and **n2** are 0, the progress
	indicator displays the default bar with the current win/loss situation. If no [run](run.htm) function is defined, it prints every 30 seconds a dot in the message window for indicating progress.


### Example:


```
if(!progress(0,0)) return;
```


### See also:


  [printf](printf.htm), [wait](sleep.htm)


     [► latest
  version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
