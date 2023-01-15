Here is an example of a C# program that uses the `WinINet` library to measure download and upload speeds and displays the results in the taskbar:

Copy code

```c#
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using Microsoft.Win32;

class SpeedMeter
{
    [DllImport("wininet.dll")]
    private extern static bool InternetGetConnectedState(out int description, int reservedValue);

    private static PerformanceCounter _downloadSpeed;
    private static PerformanceCounter _uploadSpeed;
    private static int _downloadSpeedValue;
    private static int _uploadSpeedValue;

    static void Main(string[] args)
    {
        if (!InternetGetConnectedState(out int description, 0))
        {
            Console.WriteLine("Not connected to the internet.");
            return;
        }

        _downloadSpeed = new PerformanceCounter("Network Interface", "Bytes Received/sec", "Local Area Connection");
        _uploadSpeed = new PerformanceCounter("Network Interface", "Bytes Sent/sec", "Local Area Connection");

        while (true)
        {
            _downloadSpeedValue = (int)_downloadSpeed.NextValue();
            _uploadSpeedValue = (int)_uploadSpeed.NextValue();

            TaskbarProgress.SetState(TaskbarProgressBarState.Normal);
            TaskbarProgress.SetValue(_downloadSpeedValue, _uploadSpeedValue);

            Console.WriteLine("Download speed: " + _downloadSpeedValue + " bytes/sec");
            Console.WriteLine("Upload speed: " + _uploadSpeedValue + " bytes/sec");

            System.Threading.Thread.Sleep(1000);
        }
    }
}
```

This code uses the `InternetGetConnectedState` function from the `wininet.dll` library to check if the computer is connected to the internet.

Then it uses the `PerformanceCounter` class to measure the current download and upload speeds of the "Local Area Connection" network adapter.

The results are displayed in the taskbar using the `TaskbarProgress` class which is not part of the .Net framework and you have to implement it.

It's important to note that this is just a simple example and may not work as-is. You'll likely need to customize it to suit your specific requirements and environment.

It's also important to note that the specific names of the counters and the instance may change depending on the system you are running this on. You will have to check the exact names of the counters and the instance on your system.
