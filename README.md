<img width="1919" height="1078" alt="krs_notify" src="https://github.com/user-attachments/assets/14c5a07e-c39b-41a4-9835-c437eaf9e33f" />


```markdown
# KRS Notify

A sleek, modern, and lightweight notification system for FiveM. This script is designed to be **Standalone**, meaning it works without any specific framework, but it can be easily integrated into **ESX**, **QBCore**, or **Qbox**.

## Features
- 4 notification types: `success`, `info`, `warning`, `error`.
- Custom icons and colors.
- Smooth animations using CSS transitions.
- Sound effects on notification arrival.
- Queue support (notifications stack vertically).

---

## 1. Installation
1. Download the resource.
2. Place it in your `resources` folder (e.g., `[standalone]/krs_notify`).
3. Add `ensure krs_notify` to your `server.cfg`.

---

## 2. Usage (Standalone)

You can trigger the notification from any other script using the export or the event.

### Client-Side Export
```lua
-- Syntax: exports.krs_notify:Alert(title, message, duration, type)
exports.krs_notify:Alert("SYSTEM", "This is a test notification", 5000, 'info')
```

### Client-Side Event
```lua
TriggerEvent('krs_notify:Alert', "SUCCESS", "Action completed!", 8000, 'success')
```

### Server-Side
To trigger a notification from the server to a specific client:
```lua
TriggerClientEvent('krs_notify:Alert', source, "ERROR", "You don't have enough money", 5000, 'error')
```

---

## 3. Framework Integration

### A. ESX Framework
To replace the default ESX notification with KRS Notify, find your `es_extended` configuration or any script using `ESX.ShowNotification` and replace the logic, or simply add this to a client script:

```lua
---@param message string The message to show
---@param notifyType? string The type of notification to show
---@param length? number The length of the notification
---@param title? string The title of the notification
---@param position? string The position of the notification
---@return nil
function ESX.ShowNotification(message, notifyType, length, title, position)
    -- Usiamo il tuo export invece di quello di esx_notify
    exports.krs_notify:Alert(title or "NOTIFICATION", message, length or 5000, notifyType or "info")
end
```

### B. QBCore Framework
To use KRS Notify as the default for QBCore, go to `qb-core/client/functions.lua` and look for `QBCore.Functions.Notify`. Replace the content with:

```lua
function QBCore.Functions.Notify(text, textype, length)
    local ttext, caption, ttype, duration
    -- 1. Check if input is a table (New QB System) or a string (Legacy System)
    if type(text) == "table" then
        ttext = text.text or 'No message'
        caption = text.caption or 'NOTIFICATION'
        ttype = textype or 'primary'
        duration = length or 5000
    else
        ttext = text
        caption = 'NOTIFICATION'
        ttype = textype or 'primary'
        duration = length or 5000
    end
    -- 2. Type Mapping (QB uses 'primary' or 'inform', we map them to 'info')
    if ttype == 'primary' or ttype == 'inform' then 
        ttype = 'info' 
    end
    -- Note: If QB sends custom types like 'police' or 'hospital', 
    -- your JS will use the default color unless you define them in script.js.

    -- 3. Trigger the KRS Notify export
    exports.krs_notify:Alert(caption, ttext, duration, ttype)
end
```

### C. Qbox Framework
Similar to QBCore, you can override the global notify function or use the export directly in your scripts:

```lua
exports.qbx_core:Notify("Message", "success") -- Standard Qbox call
-- To force KRS Notify:
exports.krs_notify:Alert("QBOX", "Message description", 5000, 'success')
```

---

## 4. Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `title` | string | The bold title at the top of the notification. |
| `message` | string | The main text content. |
| `time` | number | Duration in milliseconds (e.g., 5000 for 5 seconds). |
| `type` | string | `success`, `info`, `warning`, `error`. |

---

## 5. Examples
```lua
-- Success
exports.krs_notify:Alert("BANK", "Transfer successful", 5000, 'success')

-- Warning
exports.krs_notify:Alert("ENGINE", "Your vehicle is damaged!", 7000, 'warning')

-- Error
exports.krs_notify:Alert("POLICE", "You are under arrest", 10000, 'error')
```
```
