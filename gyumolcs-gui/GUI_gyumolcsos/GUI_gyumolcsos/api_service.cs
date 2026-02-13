using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace GUI_gyumolcsos
{
    internal class api_service
    {
        readonly HttpClient client = new HttpClient();
        readonly string base_url = "https://localhost:5000/api/gyumolcsok";
        public api_service() 
        {

            client.BaseAddress = new Uri(base_url);
        }
         public async Task<List<Gyumolcs>> get_gyumolcsok()
        {
            var response = await client.GetAsync("http://localhost:5000/gyumolcs");
            if (response.IsSuccessStatusCode)
            {
                var gyumolcsokJsonString = await response.Content.ReadAsStringAsync();
                return Gyumolcs.FromJson(gyumolcsokJsonString);
            }
            else
            {
                throw new Exception("Hiba a gyümölcsök lekérésekor: " + response.ReasonPhrase);
            }
        }


    }
}
