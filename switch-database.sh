#!/bin/bash

# Script untuk switch antara Mock dan Real Supabase Database

echo "🔄 Supabase Database Switcher"
echo "=============================="
echo ""
echo "Pilih database mode:"
echo "1) Real Database (gunakan akun dari Supabase)"
echo "2) Mock Database (gunakan akun dummy untuk testing)"
echo ""
read -p "Pilihan (1/2): " choice

case $choice in
  1)
    echo ""
    echo "📦 Switching to REAL database..."
    
    # Backup mock if not exists
    if [ -f "src/services/supabaseClient.mock.js" ]; then
      echo "✓ Mock backup already exists"
    else
      if [ -f "src/services/supabaseClient.js" ]; then
        mv src/services/supabaseClient.js src/services/supabaseClient.mock.js
        echo "✓ Current client backed up as supabaseClient.mock.js"
      fi
    fi
    
    # Use real client
    if [ -f "src/services/supabaseClient.real.js" ]; then
      cp src/services/supabaseClient.real.js src/services/supabaseClient.js
      echo "✓ Real database client activated"
      echo ""
      echo "✅ Done! Now using REAL Supabase database"
      echo "📝 Login dengan akun yang ada di database Anda"
      echo ""
      echo "Restart dev server:"
      echo "  npm run dev"
    else
      echo "❌ Error: supabaseClient.real.js not found"
      echo "File sudah dibuat, check di src/services/"
    fi
    ;;
    
  2)
    echo ""
    echo "📦 Switching to MOCK database..."
    
    # Backup real if not exists
    if [ -f "src/services/supabaseClient.real.js" ]; then
      echo "✓ Real backup already exists"
    else
      if [ -f "src/services/supabaseClient.js" ]; then
        cp src/services/supabaseClient.js src/services/supabaseClient.real.js
        echo "✓ Current client backed up as supabaseClient.real.js"
      fi
    fi
    
    # Use mock client
    if [ -f "src/services/supabaseClient.mock.js" ]; then
      cp src/services/supabaseClient.mock.js src/services/supabaseClient.js
      echo "✓ Mock database client activated"
      echo ""
      echo "✅ Done! Now using MOCK database"
      echo "📝 Login dengan akun test:"
      echo "   Admin:  admin@test.com / admin123"
      echo "   Member: member@test.com / member123"
      echo ""
      echo "Restart dev server:"
      echo "  npm run dev"
    else
      echo "❌ Error: supabaseClient.mock.js not found"
      echo "File mock tidak ditemukan"
    fi
    ;;
    
  *)
    echo ""
    echo "❌ Pilihan tidak valid"
    exit 1
    ;;
esac
