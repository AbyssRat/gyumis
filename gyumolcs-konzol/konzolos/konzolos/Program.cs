using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Globalization;
using CsvHelper;

namespace konzolos
{
    internal class Program
    {

        class Szallitmány
        {
            public int GyumolcsId { get; set; }
            public int Mennyiseg { get; set; }
            public decimal Egysegar { get; set; }
            public DateTime Erkezett { get; set; }
        }



        static void Main(string[] args)
        {

            string filePath = "erkezes.csv";

            if (!File.Exists(filePath))
            {
                Console.WriteLine("A CSV fájl nem található!");
                return;
            }

            var lines = File.ReadAllLines(filePath).Skip(1); // kihagyjuk a fejlécet
            List<Szallitmány> szallitmanyok = new List<Szallitmány>();

            foreach (var line in lines)
            {
                var parts = line.Split(';');

                szallitmanyok.Add(new Szallitmány
                {
                    GyumolcsId = int.Parse(parts[0]),
                    Mennyiseg = int.Parse(parts[1]),
                    Egysegar = decimal.Parse(parts[2], CultureInfo.InvariantCulture),
                    Erkezett = DateTime.Parse(parts[3], CultureInfo.InvariantCulture)
                });
            }

            // 1. Összes mennyiség
            int osszesMennyiseg = szallitmanyok.Sum(s => s.Mennyiseg);
            Console.WriteLine($"Összes gyümölcs mennyisége: {osszesMennyiseg}");

            // 2. Összes érték
            decimal osszesErtek = szallitmanyok.Sum(s => s.Mennyiseg * s.Egysegar);
            Console.WriteLine($"Összes gyümölcs értéke: {osszesErtek} HUF");

            // 3. Legdrágább gyümölcs (egységár alapján)
            var legdragabb = szallitmanyok.OrderByDescending(s => s.Egysegar).First();
            Console.WriteLine($"Legdrágább gyümölcs ID: {legdragabb.GyumolcsId}, Egységára: {legdragabb.Egysegar} HUF");

            // 4. Alma összérték (gyumolcsid = 1)
            decimal almaErtek = szallitmanyok
                .Where(s => s.GyumolcsId == 1)
                .Sum(s => s.Mennyiseg * s.Egysegar);
            Console.WriteLine($"Alma összértéke: {almaErtek} HUF");

            // 5. Leggyakrabban érkezett gyümölcs
            var leggyakoribb = szallitmanyok
                .GroupBy(s => s.GyumolcsId)
                .OrderByDescending(g => g.Count())
                .First();
            Console.WriteLine($"Leggyakrabban érkezett gyümölcs ID: {leggyakoribb.Key}, Érkezések száma: {leggyakoribb.Count()}");

            // 6. 2026 februári szállítmányok száma
            int februariSzallitmanyok = szallitmanyok
                .Count(s => s.Erkezett.Year == 2026 && s.Erkezett.Month == 2);
            Console.WriteLine($"2026 februárjában érkezett szállítmányok száma: {februariSzallitmanyok}");
        }


    }
    }


