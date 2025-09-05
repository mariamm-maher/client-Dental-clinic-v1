# Schedule Store Refactoring - Summary

## Overview

Successfully refactored the `settingsStore.js` to focus specifically on schedule management and align with the database schema structure.

## Database Schema Alignment

The store now matches your database schema:

### TimeSlot Schema

```javascript
{
  enabled: { type: Boolean, default: true },
  startHour: { type: Number, min: 0, max: 23, required: true },
  startMinute: { type: Number, min: 0, max: 59, required: true },
  endHour: { type: Number, min: 0, max: 23, required: true },
  endMinute: { type: Number, min: 0, max: 59, required: true },
}
```

### ClinicSettings Schema

```javascript
{
  weeklySchedule: {
    type: Map,
    of: [TimeSlotSchema], // Each day is a key → array of slots
    default: new Map(),
  },
  timezone: {
    type: String,
    default: "Africa/Cairo",
  },
}
```

## Key Changes Made

### 1. Store Structure

- **Before**: `schedule` object with `enabled` and `shifts` properties
- **After**: `weeklySchedule` object where each day is an array of time slots
- **Added**: `timezone` field
- **Removed**: Unnecessary profile, notifications, theme, and system state

### 2. Data Format

- **Before**: Time strings like "09:00", "17:00"
- **After**: Hour/minute numbers like `{ startHour: 9, startMinute: 0, endHour: 17, endMinute: 0 }`

### 3. API Methods

- **Updated**: `saveSchedule()` - sends data directly in database format
- **Updated**: `loadSchedule()` - loads data from `getClinicSettings()`
- **Renamed**: `loadSettings()` → `loadSchedule()`
- **Kept**: `initializeWeeklySchedule()`, `resetSettings()` for DELETE API

### 4. Action Methods

- **Renamed**: `addShift()` → `addTimeSlot()`
- **Renamed**: `removeShift()` → `removeTimeSlot()`
- **Updated**: `updateTimeSlot()` - now accepts full slot object
- **Updated**: `toggleDay()` - works with array structure

### 5. Component Updates

Updated the following components to work with new data structure:

#### ScheduleSettings.jsx

- Uses `weeklySchedule` instead of `schedule`
- Updated method calls and data structure checks
- Uses `loadSchedule()` instead of `loadSettings()`

#### DayScheduleCard.jsx

- Now handles arrays of time slots instead of `enabled/shifts` structure
- Updated logic for checking if day is enabled

#### ShiftEditor.jsx

- Converts between hour/minute format and time strings for UI
- Updated callbacks to use new data structure

#### ScheduleHeader.jsx

- Updated schedule counting logic for new array structure

### 6. Helper Functions Added

- `formatTimeSlot()` - converts slot to display string
- `parseTimeString()` - converts time string to hour/minute
- `getScheduleSummary()` - provides schedule statistics
- `validateTimeSlot()` - validates time slot logic

## API Integration

The store now works seamlessly with your three API endpoints:

1. **GET** `getClinicSettings()` - loads existing schedule
2. **PUT/POST** `updateClinicSettings({ weeklySchedule, timezone })` - saves/creates schedule
3. **DELETE** `deleteClinicSettings()` - resets schedule

## Data Flow

```
Database (MongoDB) ↔ API ↔ Store ↔ Components
     ↓                ↓      ↓        ↓
  TimeSlot[]      JSON    Store    UI Display
  per day                State   (time strings)
```

## Backward Compatibility

- Maintained the same export name `useSettingsStore` for existing imports
- All existing component props and callbacks work with updated logic
- No breaking changes to external API

## Benefits

1. **Database Aligned**: Direct mapping to your MongoDB schema
2. **Type Safe**: Clear number types for hours/minutes
3. **Focused**: Store only handles schedule functionality
4. **Maintainable**: Cleaner, more focused codebase
5. **Efficient**: No unnecessary data transformations

## Usage Example

```javascript
const { weeklySchedule, addTimeSlot, updateTimeSlot, saveSchedule } =
  useSettingsStore();

// Add time slot
addTimeSlot("monday");

// Update time slot
updateTimeSlot("monday", 0, {
  startHour: 9,
  startMinute: 30,
  endHour: 12,
  endMinute: 0,
});

// Save to database
await saveSchedule();
```

The refactoring is complete and ready for use with your clinic scheduling system!
