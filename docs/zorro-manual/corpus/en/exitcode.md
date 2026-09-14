# ExitCode

Source: https://zorro-project.com/manual/en/exitcode.htm

ExitCode


## ExitCode

The exit code of the Zorro application. It not set, Zorro terminates with exit
code 0.


### Type:

**int**

### Remarks:


- For checking the exitcode in a Windows batch file or Cmd shell, use the
  **%ERRORLEVEL%** variable and make sure to start the application
  with **start /wait** (see example).


### Example


```
*Script Test.c:*
void main() { ExitCode = 777; }

*Cmd Shell:*
start /wait Zorro -run Test
echo %ERRORLEVEL%
```


### See also:

[Command line](command.htm)[](hedge.htm),
[quit](quit.htm), [
HWnd](hwnd.htm)


 
[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
