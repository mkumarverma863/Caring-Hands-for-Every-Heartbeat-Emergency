import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Shield,
  Bell,
  Watch,
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  Sliders,
  AlertCircle,
  Palette
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDevice } from '../context/DeviceContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';
import { emergencyContacts as initialContacts } from '../data/sosData';

export const SettingsPage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { device } = useDevice();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'contacts' | 'notifications' | 'device' | 'security'>('appearance');

  // Profile Form
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Eleanor Vance',
    email: user?.email || 'eleanor.vance@demo.elderguard.io',
    phone: user?.phone || '+1 (555) 234-5678',
    age: user?.age || 74,
    bloodType: user?.bloodType || 'O+'
  });

  // Emergency Contacts
  const [contacts, setContacts] = useState(initialContacts);
  const [newContact, setNewContact] = useState({ name: '', relationship: '', phone: '' });
  const [showAddContact, setShowAddContact] = useState(false);

  // Notification Toggles
  const [notifSettings, setNotifSettings] = useState({
    emergencyAlerts: true,
    fallAlerts: true,
    healthAlerts: true,
    deviceOfflineAlerts: true,
    lowBatteryAlerts: true,
    smsDispatch: true
  });

  // Device Settings
  const [fallSensitivity, setFallSensitivity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [countdownSec, setCountdownSec] = useState<number>(20);
  const [deviceName, setDeviceName] = useState(device.deviceName);

  // Password fields
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });

  // Save feedback state
  const [saveSuccess, setSaveSuccess] = useState('');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(profileData);
    setSaveSuccess('Profile updated successfully.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;
    const added = {
      id: `c-${Date.now()}`,
      name: newContact.name,
      relationship: newContact.relationship || 'Caregiver',
      phone: newContact.phone,
      email: 'contact@demo.elderguard.io',
      isPrimary: false,
      notifyOnSOS: true,
      notifyOnFall: true
    };
    setContacts([...contacts, added]);
    setNewContact({ name: '', relationship: '', phone: '' });
    setShowAddContact(false);
    setSaveSuccess('Emergency contact added.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
    setSaveSuccess('Contact removed.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200/80">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">System & Account Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure emergency dispatch contacts, wearable sensitivity thresholds, and notifications.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
          { id: 'profile', label: 'User Profile', icon: User },
          { id: 'contacts', label: 'Emergency Contacts', icon: Phone },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'device', label: 'Device & Sensitivity', icon: Sliders },
          { id: 'security', label: 'Security & Password', icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? (theme === 'black-purple' 
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-900/50' 
                      : theme === 'black-white'
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-blue-600 text-white shadow-sm shadow-blue-500/20')
                  : (theme === 'black-purple'
                      ? 'bg-purple-950/40 text-purple-200 hover:bg-purple-900/40 border border-purple-800/30'
                      : theme === 'black-white'
                      ? 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
                      : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80')
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: Appearance & Theme */}
      {activeTab === 'appearance' && (
        <div className={`rounded-3xl p-6 sm:p-8 border shadow-xs max-w-3xl space-y-6 transition-colors ${
          theme === 'black-purple'
            ? 'bg-[#150f24] border-purple-800/50 text-white'
            : theme === 'black-white'
            ? 'bg-[#121212] border-neutral-800 text-white'
            : 'bg-white border-slate-200/80 text-slate-900'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <Palette className={`w-5 h-5 ${
                theme === 'black-purple' ? 'text-purple-400' : theme === 'black-white' ? 'text-white' : 'text-blue-600'
              }`} />
              <h3 className="text-base font-bold">Theme & Visual Experience</h3>
            </div>
            <p className="text-xs opacity-75 mt-1">
              Select your preferred visual style. Choose between Black & Purple, High-Contrast Black & White, or Minimalist Clean Light.
            </p>
          </div>

          <ThemeSelector variant="full" />

          <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
            theme === 'black-purple'
              ? 'bg-purple-950/50 border-purple-800/40 text-purple-200'
              : theme === 'black-white'
              ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <h4 className="font-bold flex items-center gap-1.5">
              <span>Selected Mode:</span>
              <span className="font-mono text-purple-400 uppercase font-bold">{theme}</span>
            </h4>
            <p className="opacity-80 text-2xs leading-relaxed">
              Theme preferences are stored locally in your browser storage and will be remembered across all pages, charts, notifications, and emergency monitors.
            </p>
          </div>
        </div>
      )}

      {/* TAB 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-2xl">
          <h3 className="text-base font-bold text-slate-900 mb-1">User & Patient Profile</h3>
          <p className="text-xs text-slate-500 mb-6">Personal details associated with wearable telemetry</p>

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Age</label>
                <input
                  type="number"
                  value={profileData.age}
                  onChange={(e) => setProfileData({ ...profileData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Blood Type</label>
              <input
                type="text"
                value={profileData.bloodType}
                onChange={(e) => setProfileData({ ...profileData, bloodType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Emergency Contacts */}
      {activeTab === 'contacts' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Designated Emergency Contacts</h3>
              <p className="text-xs text-slate-500">People automatically alerted on SOS and Fall events</p>
            </div>
            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>

          {showAddContact && (
            <form onSubmit={handleAddContact} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
              <h4 className="font-bold text-slate-800">New Emergency Contact</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Contact Name"
                  required
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                />
                <input
                  type="text"
                  placeholder="Relationship (e.g. Daughter)"
                  required
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700"
                >
                  Add Contact
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-slate-100">
            {contacts.map((contact) => (
              <div key={contact.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{contact.name}</span>
                      {contact.isPrimary && (
                        <span className="text-2xs font-bold px-1.5 py-0.5 bg-blue-600 text-white rounded">
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{contact.relationship} • {contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!contact.isPrimary && (
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove contact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-2xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Notification Preferences</h3>
            <p className="text-xs text-slate-500">Configure alert channels and triggers</p>
          </div>

          <div className="space-y-4 divide-y divide-slate-100 text-xs">
            <div className="pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Emergency SOS Audio Alarm</p>
                <p className="text-slate-500">Play siren sound on device when SOS triggers</p>
              </div>
              <input
                type="checkbox"
                checked={notifSettings.emergencyAlerts}
                onChange={(e) => setNotifSettings({ ...notifSettings, emergencyAlerts: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Fall Detection Alerts</p>
                <p className="text-slate-500">Notify care team if a fall impact is confirmed</p>
              </div>
              <input
                type="checkbox"
                checked={notifSettings.fallAlerts}
                onChange={(e) => setNotifSettings({ ...notifSettings, fallAlerts: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Health Vitals Out-of-Range</p>
                <p className="text-slate-500">Alert if heart rate exceeds 110 BPM or drops below 50 BPM</p>
              </div>
              <input
                type="checkbox"
                checked={notifSettings.healthAlerts}
                onChange={(e) => setNotifSettings({ ...notifSettings, healthAlerts: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Device Low Battery Warning</p>
                <p className="text-slate-500">Notify when battery level drops below 20%</p>
              </div>
              <input
                type="checkbox"
                checked={notifSettings.lowBatteryAlerts}
                onChange={(e) => setNotifSettings({ ...notifSettings, lowBatteryAlerts: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Device & Sensitivity */}
      {activeTab === 'device' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-2xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Wearable Device Configuration</h3>
            <p className="text-xs text-slate-500">Hardware parameters and algorithm thresholds</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Paired Device Name</label>
              <input
                type="text"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1.5">Fall Detection Sensitivity</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Low', 'Medium', 'High'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFallSensitivity(level)}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                      fallSensitivity === level
                        ? 'bg-blue-50 border-blue-600 text-blue-700 ring-2 ring-blue-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-2xs text-slate-500 mt-1.5">
                Medium is recommended for daily active living to prevent false triggers during sitting.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1.5">Emergency SOS Cancel Countdown</label>
              <div className="grid grid-cols-3 gap-3">
                {[15, 20, 30].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setCountdownSec(sec)}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                      countdownSec === sec
                        ? 'bg-blue-50 border-blue-600 text-blue-700 ring-2 ring-blue-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {sec} Seconds
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Security */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-2xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Security & Session</h3>
            <p className="text-xs text-slate-500">Manage demo credentials and active session</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSaveSuccess('Password updated (Mock).');
              setTimeout(() => setSaveSuccess(''), 3000);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </form>

          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-sm font-bold text-red-600 mb-1">Sign Out of ElderGuard</h4>
            <p className="text-xs text-slate-500 mb-3">Terminate current active session on this device.</p>
            <button
              onClick={logout}
              className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
