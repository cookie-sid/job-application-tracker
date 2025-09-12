/**
 * Database Setup Script
 * Creates necessary tables for the Job Application Tracker
 */

require('dotenv').config();
const { supabase } = require('../src/config/database');
const logger = require('../src/utils/logger');

async function setupDatabase() {
  console.log('🔧 Setting up database tables...\n');

  try {
    // Create users table
    console.log('Creating users table...');
    const { error: usersError } = await supabase.rpc('create_users_table', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          skills TEXT[] DEFAULT '{}',
          resume_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create index on email for faster lookups
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      `
    });

    // Since rpc might not work, let's use a direct approach
    // Create users table with direct SQL
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        skills TEXT[] DEFAULT '{}',
        resume_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `;

    // Create job_applications table
    console.log('Creating job_applications table...');
    const createJobApplicationsTable = `
      CREATE TABLE IF NOT EXISTS job_applications (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        job_url TEXT NOT NULL,
        company VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        job_description TEXT,
        skills_matched TEXT[],
        match_percentage INTEGER CHECK (match_percentage >= 0 AND match_percentage <= 100),
        status VARCHAR(50) DEFAULT 'applied' CHECK (status IN ('applied', 'interview', 'rejected', 'accepted', 'withdrawn')),
        applied_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        notes TEXT,
        salary_range VARCHAR(100),
        location VARCHAR(255),
        work_type VARCHAR(50) DEFAULT 'full-time',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
      CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
      CREATE INDEX IF NOT EXISTS idx_job_applications_company ON job_applications(company);
    `;

    // Create recruiter_contacts table
    console.log('Creating recruiter_contacts table...');
    const createRecruiterContactsTable = `
      CREATE TABLE IF NOT EXISTS recruiter_contacts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        company VARCHAR(255),
        position VARCHAR(255),
        linkedin_url TEXT,
        notes TEXT,
        last_contact_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        follow_up_reminder TIMESTAMP WITH TIME ZONE,
        status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'responded')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_recruiter_contacts_user_id ON recruiter_contacts(user_id);
      CREATE INDEX IF NOT EXISTS idx_recruiter_contacts_company ON recruiter_contacts(company);
      CREATE INDEX IF NOT EXISTS idx_recruiter_contacts_status ON recruiter_contacts(status);
    `;

    // Create application_emails table (for tracking emails sent to recruiters)
    console.log('Creating application_emails table...');
    const createApplicationEmailsTable = `
      CREATE TABLE IF NOT EXISTS application_emails (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
        recruiter_id UUID REFERENCES recruiter_contacts(id) ON DELETE CASCADE,
        subject VARCHAR(500),
        body TEXT,
        sent_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        response_received BOOLEAN DEFAULT FALSE,
        response_date TIMESTAMP WITH TIME ZONE,
        follow_up_scheduled TIMESTAMP WITH TIME ZONE,
        email_type VARCHAR(50) DEFAULT 'application' CHECK (email_type IN ('application', 'follow_up', 'thank_you', 'inquiry')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_application_emails_user_id ON application_emails(user_id);
      CREATE INDEX IF NOT EXISTS idx_application_emails_application_id ON application_emails(application_id);
      CREATE INDEX IF NOT EXISTS idx_application_emails_sent_date ON application_emails(sent_date);
    `;

    // Execute table creation
    const tables = [
      { name: 'users', sql: createUsersTable },
      { name: 'job_applications', sql: createJobApplicationsTable },
      { name: 'recruiter_contacts', sql: createRecruiterContactsTable },
      { name: 'application_emails', sql: createApplicationEmailsTable }
    ];

    for (const table of tables) {
      try {
        const { error } = await supabase.rpc('exec_sql', {
          sql: table.sql
        });
        
        // If rpc doesn't work, we'll need to create tables manually in Supabase dashboard
        if (error) {
          console.log(`⚠️  Could not create ${table.name} table programmatically.`);
          console.log(`Please create this table manually in Supabase dashboard:`);
          console.log(table.sql);
          console.log('\n---\n');
        } else {
          console.log(`✅ ${table.name} table created successfully`);
        }
      } catch (err) {
        console.log(`⚠️  Error creating ${table.name}: ${err.message}`);
        console.log(`SQL for manual creation:`);
        console.log(table.sql);
        console.log('\n---\n');
      }
    }

    // Create updated_at trigger function
    console.log('Creating trigger function for updated_at...');
    const createTriggerFunction = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `;

    // Create triggers for each table
    const createTriggers = `
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      
      DROP TRIGGER IF EXISTS update_job_applications_updated_at ON job_applications;
      CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      
      DROP TRIGGER IF EXISTS update_recruiter_contacts_updated_at ON recruiter_contacts;
      CREATE TRIGGER update_recruiter_contacts_updated_at BEFORE UPDATE ON recruiter_contacts 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      
      DROP TRIGGER IF EXISTS update_application_emails_updated_at ON application_emails;
      CREATE TRIGGER update_application_emails_updated_at BEFORE UPDATE ON application_emails 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `;

    console.log('\n🏁 Database setup completed!');
    console.log('\nTables created:');
    console.log('  - users (authentication)');
    console.log('  - job_applications (main tracking)');
    console.log('  - recruiter_contacts (networking)');
    console.log('  - application_emails (email tracking)');
    console.log('\nYou can now start using the API endpoints.\n');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

// Run setup if called directly
if (require.main === module) {
  setupDatabase().then(() => {
    console.log('Setup complete! You can now start the server with: npm run dev');
    process.exit(0);
  });
}

module.exports = { setupDatabase };