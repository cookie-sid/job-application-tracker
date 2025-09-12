/**
 * Supabase Database Configuration
 * Initialize and export Supabase client
 */

const { createClient } = require('@supabase/supabase-js');
const logger = require('../utils/logger');

// Validate environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  logger.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test connection function
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist yet
      logger.error('Supabase connection test failed:', error);
      return false;
    }
    
    logger.info('Supabase connection successful');
    return true;
  } catch (err) {
    logger.error('Supabase connection error:', err.message);
    return false;
  }
};

module.exports = {
  supabase,
  testConnection
};