using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Globalization;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;

namespace konzolos
{
    internal class Program
    {

        class Gyumolcs
        {
            public long Id { get; set; }
            public string Nev { get; set; }
        }

        class Erkezes
        {
            public long GyumolcsId { get; set; }
            public int Mennyiseg { get; set; }
            public decimal Egysegar { get; set; }
            public DateTime Erkezett { get; set; }
        }


        static void Main(string[] args)
        {

            string connStr = "server=127.0.0.1;port=3307;user=root;password=;database=gyumolcs_db";
            var gyumolcsok = new List<Gyumolcs>();
            var erkezesek = new List<Erkezes>();

            using (var conn = new MySqlConnection(connStr))
            {
                conn.Open();

                // Gyümölcsök beolvasása
                var cmdG = new MySqlCommand("SELECT gyumolcsid, nev FROM gyumolcs", conn);
                using (var reader = cmdG.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        gyumolcsok.Add(new Gyumolcs
                        {
                            Id = reader.GetInt64("gyumolcsid"),
                            Nev = reader.GetString("nev")
                        });
                    }
                }

                // Érkezések beolvasása
                var cmdE = new MySqlCommand("SELECT gyumolcsid, mennyiseg, egysegar, erkezett FROM erkezes", conn);
                using (var reader = cmdE.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        erkezesek.Add(new Erkezes
                        {
                            GyumolcsId = reader.GetInt64("gyumolcsid"),
                            Mennyiseg = reader.GetInt32("mennyiseg"),
                            Egysegar = reader.GetDecimal("egysegar"),
                            Erkezett = reader.GetDateTime("erkezett")
                        });
                    }
                }
            }

            // --- Mutatószámok ---

            // 1. Összes gyümölcs mennyisége
            int osszesMennyiseg = erkezesek.Sum(e => e.Mennyiseg);
            Console.WriteLine($"Összes gyümölcs mennyisége: {osszesMennyiseg}");

            // 2. Összes gyümölcs értéke
            decimal osszesErtek = erkezesek.Sum(e => e.Mennyiseg * e.Egysegar);
            Console.WriteLine($"Összes gyümölcs értéke: {osszesErtek} Ft");

            // 3. Legdrágább gyümölcs
            var legdragabbId = erkezesek.OrderByDescending(e => e.Egysegar).First().GyumolcsId;
            var legdragabbNev = gyumolcsok.First(g => g.Id == legdragabbId).Nev;
            var legdragabbAr = erkezesek.Where(e => e.GyumolcsId == legdragabbId).Max(e => e.Egysegar);
            Console.WriteLine($"Legdrágább gyümölcs: {legdragabbNev}, Egységár: {legdragabbAr} Ft");

            // 4. Alma (id=1) összértéke
            decimal almaErtek = erkezesek
                .Where(e => e.GyumolcsId == 1)
                .Sum(e => e.Mennyiseg * e.Egysegar);
            Console.WriteLine($"Alma érkezések összértéke: {almaErtek} Ft");

            // 5. Legtöbbször érkezett gyümölcs
            var legtobbszorErkezettId = erkezesek
                .GroupBy(e => e.GyumolcsId)
                .OrderByDescending(g => g.Count())
                .First().Key;
            var legtobbszorErkezettNev = gyumolcsok.First(g => g.Id == legtobbszorErkezettId).Nev;
            Console.WriteLine($"Legtöbbször érkezett gyümölcs: {legtobbszorErkezettNev}");

            // 6. Szállítmányok 2026 februárjában
            int februarSzall = erkezesek.Count(e => e.Erkezett.Year == 2026 && e.Erkezett.Month == 2);
            Console.WriteLine($"Szállítmányok 2026 februárjában: {februarSzall}");
        }
    }
}
    }
}
