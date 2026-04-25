local function Alert(title, message, time, type)
    SendNUIMessage({
        action = 'open',
        title = title,
        message = message,
        time = time,
        type = type
    })
end

exports('Alert', Alert)

RegisterNetEvent('krs_notify:Alert', function(title, message, time, type)
    Alert(title, message, time, type)
end)

-- RegisterCommand('TestNotify', function()
--     exports.krs_notify:Alert("NOTIFY", "Great job!", 10000, 'success')
--     exports.krs_notify:Alert("NOTIFY", "The shop is now open", 10000, 'info')
--     exports.krs_notify:Alert("NOTIFY", "Please try again later", 10000, 'error')
--     exports.krs_notify:Alert("NOTIFY", "Are you sure you want to proceed? This action may cause issues.", 10000, 'warning')
-- end)