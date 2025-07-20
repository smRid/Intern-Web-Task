const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'dua_main.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Database tables:');
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) {
    console.error(err);
    return;
  }
  
  tables.forEach(table => {
    console.log(`\n--- Table: ${table.name} ---`);
    
    // Get table schema
    db.all(`PRAGMA table_info(${table.name})`, (err, columns) => {
      if (err) {
        console.error(err);
        return;
      }
      
      console.log('Columns:');
      columns.forEach(col => {
        console.log(`  ${col.name} (${col.type})`);
      });
      
      // Get sample data
      db.all(`SELECT * FROM ${table.name} LIMIT 3`, (err, rows) => {
        if (err) {
          console.error(err);
          return;
        }
        
        console.log('Sample data:');
        rows.forEach((row, index) => {
          console.log(`  Row ${index + 1}:`, row);
        });
      });
    });
  });
  
  setTimeout(() => {
    db.close();
  }, 2000);
});
