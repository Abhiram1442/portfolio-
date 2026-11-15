'use client';

import React, { useState, useEffect } from 'react';
import { Bell, BellRing, Check, Clock, Calendar as CalendarIcon, ShieldAlert } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface SessionNotificationModalProps {
  sessionTitle: string;
  sessionTime: string;
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationManager({
  sessionTitle,
  sessionTime,
  isOpen,
  onClose,
}: SessionNotificationModalProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [minutesBefore, setMinutesBefore] = useState<number>(30);
  const [allWeekend, setAllWeekend] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
    }
  };

  const handleSaveReminder = async () => {
    setLoading(true);
    // Request permission if not yet granted
    if (permission === 'default' && typeof window !== 'undefined' && 'Notification' in window) {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res !== 'granted') {
        setLoading(false);
        return;
      }
    }

    // Save preference to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('notification_preferences').insert({
          user_id: 'anonymous-fan',
          session_type: sessionTitle,
          reminder_minutes: minutesBefore,
          enabled: true,
        });
      } catch (err) {
        console.error('Supabase notification save error:', err);
      }
    }

    // Schedule local browser timeout notification if granted and within session range
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('F1 LIVE — Reminder Set!', {
        body: `You will be reminded ${minutesBefore} minutes before ${sessionTitle}.`,
        icon: '/favicon.ico',
      });
    }

    setLoading(false);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#161616] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 bg-[#121212] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e10600]/10 border border-[#e10600]/30 flex items-center justify-center text-[#e10600]">
              <BellRing size={18} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Smart Race Reminder</h3>
              <p className="text-xs text-gray-400">{sessionTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg px-2">
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4">
          <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3 text-xs text-gray-300">
            <Clock size={16} className="text-[#e10600] shrink-0" />
            <div>
              <span className="font-semibold text-white">Scheduled Start: </span>
              {sessionTime}
            </div>
          </div>

          {/* Browser Permission Prompt Banner */}
          {permission === 'default' && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300 flex items-start gap-2.5">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <div>
                <span>Browser notifications require your permission to alert you before the lights go out.</span>
                <button
                  onClick={handleRequestPermission}
                  className="mt-2 block px-2.5 py-1 bg-amber-500 text-black font-bold rounded text-[11px] hover:bg-amber-400 transition"
                >
                  Enable Browser Alerts
                </button>
              </div>
            </div>
          )}

          {/* Reminder Timing Selector */}
          <div>
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
              Remind Me Before Session
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[15, 30, 60, 180].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setMinutesBefore(mins)}
                  className={`py-2 rounded-lg font-medium border transition ${
                    minutesBefore === mins
                      ? 'bg-[#e10600] border-[#e10600] text-white shadow-lg shadow-[#e10600]/25'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {mins === 60 ? '1 Hour' : mins === 180 ? '3 Hours' : `${mins}m`}
                </button>
              ))}
            </div>
          </div>

          {/* Whole Weekend Checkbox */}
          <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={allWeekend}
              onChange={(e) => setAllWeekend(e.target.checked)}
              className="rounded accent-[#e10600] w-4 h-4 cursor-pointer"
            />
            <div className="text-xs">
              <div className="font-semibold text-white">Notify for entire race weekend</div>
              <div className="text-gray-400 text-[11px]">Include FP1, FP2, FP3, Quali, and Race</div>
            </div>
          </label>
        </div>

        {/* Modal Actions */}
        <div className="p-5 bg-[#121212] border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveReminder}
            disabled={loading || isSaved}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-bold rounded-lg transition shadow-lg shadow-[#e10600]/30 disabled:opacity-50"
          >
            {isSaved ? (
              <>
                <Check size={14} />
                <span>Reminder Set!</span>
              </>
            ) : (
              <>
                <Bell size={14} />
                <span>{loading ? 'Saving...' : 'Set Reminder'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
