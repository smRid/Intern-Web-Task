import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const catId = searchParams.get('cat_id');
  const subcatId = searchParams.get('subcat_id');

  let query = `
    SELECT 
      id,
      cat_id,
      subcat_id,
      dua_id,
      dua_name_en,
      dua_name_bn,
      top_en,
      top_bn,
      dua_arabic,
      dua_indopak,
      clean_arabic,
      transliteration_en,
      transliteration_bn,
      translation_en,
      translation_bn,
      bottom_en,
      bottom_bn,
      refference_en,
      refference_bn,
      audio
    FROM dua 
  `;

  const params: string[] = [];
  const conditions = [];
  
  if (catId) {
    conditions.push(`cat_id = ?`);
    params.push(catId);
  }
  if (subcatId) {
    conditions.push(`subcat_id = ?`);
    params.push(subcatId);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ` ORDER BY dua_id`;

  const dbPath = path.join(process.cwd(), 'dua_main.sqlite');
  const db = new sqlite3.Database(dbPath);
  
  return new Promise<NextResponse>((resolve) => {
    db.all(query, params, (err, rows) => {
      db.close();
      
      if (err) {
        console.error('Database error:', err);
        resolve(NextResponse.json(
          { success: false, error: 'Failed to fetch duas' },
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
