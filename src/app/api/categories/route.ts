import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';

export async function GET() {
  const dbPath = path.join(process.cwd(), 'dua_main.sqlite');
  const db = new sqlite3.Database(dbPath);
  
  return new Promise<NextResponse>((resolve) => {
    db.all(`
      SELECT 
        id,
        cat_id,
        cat_name_en,
        cat_name_bn,
        no_of_subcat,
        no_of_dua,
        cat_icon
      FROM category 
      ORDER BY cat_id
    `, (err, rows) => {
      db.close();
      
      if (err) {
        console.error('Database error:', err);
        resolve(NextResponse.json(
          { success: false, error: 'Failed to fetch categories' },
          { status: 500 }
        ));
      } else {
        resolve(NextResponse.json({
          success: true,
          data: rows
        }));
      }
    });
  });
}
