using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GUI_gyumolcsos
{
    public partial class FormMain : Form
    {

        BindingList<Gyumolcs> gyumolcsok = new BindingList<Gyumolcs>();
        api_service api = new api_service();
        public FormMain()
        {
            InitializeComponent();
        }

        private void FormMain_Load(object sender, EventArgs e)
        {

            List<Gyumolcs> gyumolcsokList = api.get_gyumolcsok().Result;
        }
    }
}
