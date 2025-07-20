import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const catId = searchParams.get('cat_id');

  if (!catId) {
    return NextResponse.json(
      { success: false, error: 'Category ID is required' },
      { status: 400 }
    );
  }

  const dbPath = path.join(process.cwd(), 'dua_main.sqlite');
  const db = new sqlite3.Database(dbPath);
  
  return new Promise<NextResponse>((resolve) => {
    db.all(`
      SELECT 
        id,
        cat_id,
        subcat_id,
        subcat_name_en,
        subcat_name_bn,
        no_of_dua
      FROM sub_category 
      WHERE cat_id = ?
      ORDER BY subcat_id
    `, [catId], (err, rows) => {
      db.close();
      
      if (err) {
        console.error('Database error:', err);
        resolve(NextResponse.json(
          { success: false, error: 'Failed to fetch subcategories' },
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
