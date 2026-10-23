/**
 * DSA-Java Platform - Website Usage Analytics Configuration
 * Configures analytics tracking, provider integrations, and privacy settings.
 *
 * GitHub Pages Static Hosting Architecture:
 * - By default, analytics operates in 'local' development & browser mode.
 * - In 'local' mode, meaningful learning and browsing events are securely saved in
 *   browser localStorage to demonstrate event collection, metrics calculation, and dashboard rendering.
 * - To aggregate global metrics across all site visitors without exposing administrative secrets,
 *   connect a hosted backend (e.g., Supabase with Row Level Security) or privacy-friendly service (Plausible / GoatCounter).
 */

(function(root) {
  'use strict';

  const DSA_ANALYTICS_CONFIG = {
    // Master switch to enable or disable all analytics tracking
    enabled: true,

    // Active provider mode: 'local' | 'supabase' | 'custom'
    // 'local': Client-side localStorage logging for demonstration and local session tracking
    // 'supabase': Sends public insert-only events to Supabase database with Row Level Security
    // 'custom': Sends events to a custom REST endpoint via navigator.sendBeacon or fetch
    mode: 'local',

    // Whether explicit user consent banner is required before tracking
    // Default is false for privacy-first, cookieless, non-identifying telemetry
    requireConsent: false,

    // Anonymous Session identifier configuration (ephemeral sessionStorage only)
    sessionStorageKey: 'dsa_analytics_session_id',

    // Local event storage key for local browser mode
    localStorageKey: 'dsa_analytics_events_log',

    // Max number of events to retain in localStorage buffer before pruning oldest
    maxLocalEvents: 1000,

    // Privacy & Data collection bounds
    privacy: {
      stripQueryParameters: true,       // Strip ?token=... or ?search=... from page URLs
      collectIpAddress: false,           // Never collect full IP addresses in custom payloads
      honorDoNotTrack: true,             // Respect browser navigator.doNotTrack header
      cookieless: true                   // Zero cookies used; ephemeral session IDs only
    },

    // Supabase Configuration (Optional - for global multi-visitor aggregation)
    // IMPORTANT: Only include your PUBLIC Project URL and PUBLIC anon/publishable key here.
    // NEVER commit privileged administrator or secret database keys!
    // Server-side Row Level Security (RLS) ensures public clients can ONLY INSERT rows, never read/delete.
    supabase: {
      url: '',                           // e.g., 'https://xyzcompany.supabase.co'
      anonKey: '',                       // e.g., 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      tableName: 'website_activity_events'
    },

    // Custom Endpoint Configuration (Optional)
    customEndpoint: {
      url: '',
      headers: {}
    },

    // Debug logging to browser console
    debug: false
  };

  // Expose globally
  if (typeof window !== 'undefined') {
    window.DSA_ANALYTICS_CONFIG = DSA_ANALYTICS_CONFIG;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DSA_ANALYTICS_CONFIG;
  }
})(typeof window !== 'undefined' ? window : global);
