import { Medico } from '../models/medico.js';
import { Perfil } from '../models/perfil.js';
import * as HorarioService from '../services/horario.service.js';
import { sequelize } from '../database/database.js';

export const createMedico = async (data) => {
    try {
        // Crear el médico
        const medico = await Medico.create(data);

        // Crear los horarios
        const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
        for (const dia of dias) {
            await HorarioService.createHorario({
                turno: "mañana",
                dia: dia,
                medicoId: medico.id
            });
        }
        return { medico };
    } catch (error) {
        throw error;
    }
};

export const getMedicoById = async (id) => {
    try {
        const medico = await Medico.findByPk(id);
        return medico;
    } catch (error) {
        throw error;
    }
};

export const updateMedico = async (id, data) => {
    const transaction = await sequelize.transaction();
    try {
        const medico = await Medico.findByPk(id, { transaction });
        if (!medico) {
            throw new Error('Medico no encontrado');
        }

        await Medico.update(data, { where: { id }, transaction });

        // Eliminar horarios existentes
        const existingHorarios = await HorarioService.getHorariosByMedicoId(id, { transaction });
        for (const horario of existingHorarios) {
            await HorarioService.deleteHorario(horario.id, { transaction });
        }

        // Crear nuevos horarios según el turno
        const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
        const turnos = data.turno.split(',').map(turno => turno.trim().toLowerCase());

        for (const turno of turnos) {
            if (turno === "mañana" || turno === "tarde" || turno === "ambos") {
                for (const dia of dias) {
                    if (turno === "mañana" || turno === "ambos") {
                        const horario = await HorarioService.createHorario({
                            turno: "mañana",
                            dia: dia,
                            medicoId: medico.id,
                            horaInicio: "08:00:00",
                            horaFin: "12:00:00",
                            tiempoConsulta: 15 // Ejemplo de tiempo de consulta en minutos
                        }, { transaction });

                        await HorarioService.createItemHorarios(horario);
                    }
                    if (turno === "tarde" || turno === "ambos") {
                        const horario = await HorarioService.createHorario({
                            turno: "tarde",
                            dia: dia,
                            medicoId: medico.id,
                            horaInicio: "13:00:00",
                            horaFin: "17:00:00",
                            tiempoConsulta: 15 // Ejemplo de tiempo de consulta en minutos
                        }, { transaction });

                        await HorarioService.createItemHorarios(horario);
                    }
                }
            }
        }

        await transaction.commit();
        return medico;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deleteMedico = async (id) => {
    try {
        const medico = await Medico.findByPk(id);
        if (!medico) {
            throw new Error('Medico no encontrado');
        }
        await Perfil.destroy({ where: { id: medico.perfilId } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getMedicos = async () => {
    try {
        const medicos = await Medico.findAll();
        return medicos;
    } catch (error) {
        throw error;
    }
};

export const getMedicosByEspecialidad = async (especialidad) => {
    try {
        const medicos = await Medico.findAll({ where: { especialidad } });
        return medicos;
    } catch (error) {
        throw error;
    }
};
