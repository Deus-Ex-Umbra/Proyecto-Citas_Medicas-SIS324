import express from 'express';
import morgan from 'morgan';
import { sequelize } from '../src/database/database.js';
import perfilRoutes from '../src/routes/perfil.routes.js';
import medicoRoutes from '../src/routes/medico.routes.js'
import pacienteRoutes from '../src/routes/paciente.routes.js';
import secretariaRoutes from '../src/routes/secretaria.routes.js';
import citaRoutes from '../src/routes/cita.routes.js';
import horarioRoutes from '../src/routes/horario.routes.js';
import itemCitaRoutes from '../src/routes/itemCita.routes.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/perfil', perfilRoutes);
app.use('/medico', medicoRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/secretaria', secretariaRoutes);
app.use('/cita', citaRoutes);
app.use('/horario', horarioRoutes);
app.use('/item-cita', itemCitaRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const message = `
      <html>
        <head>
          <title>Gestión de Citas Médicas</title>
        </head>
        <body>
          <h1>Gestión de Citas Médicas</h1>
          <p>UNIVERSITARIOS:</p>
          <ul>
            <li>Aparicio Llanquipacha Gabriel</li>
            <li>Limachi Villaroel Alan Nicolás</li>
            <li>Piza Nava Vladimir</li>
            <li>Rúa Echalar Juan Manuel</li>
          </ul>
          <p>MATERIA: Ingeniería de Software – SIS324</p>
          <p>DOCENTE: Durán Quiroga Ramiro</p>
          <p>Universidad San Francisco Xavier de Chuquisaca, Bolivia</p>
        </body>
      </html>
    `;
    res.send(message);
  });

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
