import { Horario } from '../models/horario.js';
import * as ItemHorarioService from '../services/itemhorario.service.js';

const createItemHorarios = async (horario) => {
    let tiempoFinal = horario.horaFin;
    let actualidad = horario.horaInicio;
    while (actualidad < tiempoFinal) {
        actualidad += (horario.tiempoConsulta / 60);
        await ItemHorarioService.createItemHorario({
            estado: 'disponible',
            horarioId: horario.id,
            medicoId: horario.medicoId
        });
    }
};

export const createHorario = async (data) => {
    try {
        const existingHorario = await Horario.findOne({
            where: {
                medicoId: data.medicoId,
                dia: data.dia,
                turno: data.turno
            }
        });

        if (existingHorario) {
            throw new Error('El médico ya tiene un horario asignado para ese día y turno');
        }

        const horario = await Horario.create(data);
        await createItemHorarios(horario);

        return { horario };
    } catch (error) {
        throw error;
    }
};

export const getHorarioById = async (id) => {
    try {
        const horario = await Horario.findByPk(id);
        return horario;
    } catch (error) {
        throw error;
    }
};

export const updateHorario = async (id, data) => {
    try {
        const horario = await Horario.findByPk(id);
        if (!horario) {
            throw new Error('Horario no encontrado');
        }

        if (data.dia !== horario.dia || data.turno !== horario.turno) {
            const existingHorario = await Horario.findOne({
                where: {
                    medicoId: horario.medicoId,
                    dia: data.dia,
                    turno: data.turno
                }
            });

            if (existingHorario) {
                throw new Error('El médico ya tiene un horario asignado para ese día y turno');
            }
        }

        const updateFields = {
            ...data,
            horaInicio: data.horaInicio !== undefined ? data.horaInicio : horario.horaInicio,
            horaFin: data.horaFin !== undefined ? data.horaFin : horario.horaFin,
            tiempoConsulta: data.tiempoConsulta !== undefined ? data.tiempoConsulta : horario.tiempoConsulta
        };

        await Horario.update(updateFields, { where: { id } });

        if (data.horaInicio !== horario.horaInicio || data.horaFin !== horario.horaFin || data.tiempoConsulta !== horario.tiempoConsulta) {
            await ItemHorarioService.deleteItemHorariosByHorarioId(id);
            const updatedHorario = await Horario.findByPk(id);
            await createItemHorarios(updatedHorario);
        }

        return { horario };
    } catch (error) {
        throw error;
    }
};

export const deleteHorario = async (id) => {
    try {
        await ItemHorarioService.deleteItemHorariosByHorarioId(id);
        await Horario.destroy({ where: { id } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getHorarios = async () => {
    try {
        const horarios = await Horario.findAll();
        return horarios;
    } catch (error) {
        throw error;
    }
};

export const getHorariosByMedicoId = async (medicoId) => {
    try {
        const horarios = await Horario.findAll({ where: { medicoId } });
        return horarios;
    } catch (error) {
        throw error;
    }
};

export const getHorariosByDia = async (dia) => {
    try {
        const horarios = await Horario.findAll({ where: { dia } });
        return horarios;
    } catch (error) {
        throw error;
    }
};

export const getHorariosByTurno = async (turno) => {
    try {
        const horarios = await Horario.findAll({ where: { turno } });
        return horarios;
    } catch (error) {
        throw error;
    }
};

export const getHorariosByMedicoIdAndDia = async (medicoId, dia) => {
    try {
        const horarios = await Horario.findAll({ where: { medicoId, dia } });
        return horarios;
    } catch (error) {
        throw error;
    }
};

export const getHorariosByMedicoIdAndTurno = async (medicoId, turno) => {
    try {
        const horarios = await Horario.findAll({ where: { medicoId, turno } });
        return horarios;
    } catch (error) {
        throw error;
    }
};