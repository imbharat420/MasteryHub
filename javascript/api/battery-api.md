The Battery Status API is a browser API that allows web apps to access information about the battery status of the user's device. Here's an example of how you might use the Battery Status API to display the battery level and charging status of the device:

Copy code

```js
// Check if the Battery Status API is supported
if ("getBattery" in navigator) {
  // Get the battery status
  navigator.getBattery().then(battery => {
    // Update the battery level and charging status
    const batteryLevel = document.getElementById("battery-level");
    batteryLevel.textContent = `${battery.level * 100}%`;

    const batteryCharging = document.getElementById("battery-charging");
    batteryCharging.textContent = battery.charging ? "Charging" : "Discharging";

    // Set up event listeners to update the battery level and charging status when they change
    battery.addEventListener("levelchange", () => {
      batteryLevel.textContent = `${battery.level * 100}%`;
    });
    battery.addEventListener("chargingchange", () => {
      batteryCharging.textContent = battery.charging
        ? "Charging"
        : "Discharging";
    });
  });
} else {
  console.warn("Battery Status API not supported");
}
```

In this example, the code uses the `getBattery()` method to get the battery status, and then updates the battery level and charging status elements with the respective values from the `battery` object. It also sets up event listeners for the `levelchange` and `chargingchange` events, which are triggered when the battery level or charging status changes, to update the elements as needed.
