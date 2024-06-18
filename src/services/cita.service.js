import { Cita } from '../models/cita.js';
import { Pago } from '../models/pago.js';
import { Horario } from '../models/horario.js';
import { Medico } from '../models/medico.js';
import { sequelize } from '../database/database.js';

export const createCita = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const cita = await Cita.create(data, { transaction });
        const pagoData = {
            pacienteId: data.pacienteId,
            monto: data.costo,
            fecha: data.fechaHora,
            metodoPago: data.formaPago,
            descripcion: `Pago por cita ${cita.id}`,
            medicoId: data.medicoId,
            secretariaId: data.secretariaId,
            horarioId: data.horarioId
        };
        const pago = await Pago.create(pagoData, { transaction });
        let horario = await Horario.findOne({
            where: {
                fecha: data.fechaHora,
                medicoId: data.medicoId
            },
            transaction
        });

        if (!horario) {
            const medico = await Medico.findByPk(data.medicoId, { transaction });
            if (!medico || !medico.disponibilidad) {
                throw new Error('El médico no está disponible en esta fecha');
            }

            horario = await Horario.create({
                fecha: data.fechaHora,
                turno: 'Turno',
                estado: 'disponible',
                perfilId: data.medicoId
            }, { transaction });
        }
        horario.estado = 'no disponible';
        await horario.save({ transaction });
        cita.horarioId = horario.id;
        await cita.save({ transaction });

        await transaction.commit();
        return {cita, pago};
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getCitaById = async (id) => {
    try {
        const cita = await Cita.findByPk(id);
        return cita;
    } catch (error) {
        throw error;
    }
};

export const updateCita = async (id, data) => {
    const transaction = await sequelize.transaction();
    try {
        const cita = await Cita.findByPk(id, { transaction });
        if (!cita) {
            throw new Error('Cita no encontrada');
        }
        await Cita.update(data, { where: { id }, transaction });
        const pago = await Pago.findOne({ where: { descripcion: `Pago por cita ${id}` }, transaction });
        if (pago) {
            await Pago.update({
                monto: data.costo,
                fecha: data.fechaHora,
                metodoPago: data.formaPago
            }, { where: { id: pago.id }, transaction });
        }

        let horario = await Horario.findOne({
            where: {
                fecha: data.fechaHora,
                medicoId: data.medicoId
            },
            transaction
        });

        if (!horario) {
            const medico = await Medico.findByPk(data.medicoId, { transaction });
            if (!medico || !medico.disponibilidad) {
                throw new Error('El médico no está disponible en esta fecha');
            }

            horario = await Horario.create({
                fecha: data.fechaHora,
                turno: 'Turno',
                estado: 'disponible',
                perfilId: data.medicoId
            }, { transaction });
        }

        horario.estado = 'no disponible';
        await horario.save({ transaction });
        cita.horarioId = horario.id;
        await cita.save({ transaction });

        await transaction.commit();
        return cita;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deleteCita = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        await Cita.destroy({ where: { id }, transaction });
        await Pago.destroy({ where: { descripcion: `Pago por cita ${id}` }, transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getCitasByPacienteId = async (pacienteId) => {
    try {
        const citas = await Cita.findAll({
            where: { pacienteId }
        });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getCitasPendientesByPacienteId = async (pacienteId) => {
    try {
        const citas = await Cita.findAll({
            where: {
                pacienteId,
                estado: 'pendiente'
            }
        });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getCitasByMedicoId = async (medicoId) => {
    try {
        const citas = await Cita.findAll({
            where: { medicoId }
        });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getCitasPendientesByMedicoIdFecha = async (medicoId, fecha) => {
    try {
        const citas = await Cita.findAll({
            where: {
                medicoId,
                fechaHora: fecha,
                estado: 'pendiente'
            }
        });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getCitasByFecha = async (fecha) => {
    try {
        const citas = await Cita.findAll({
            where: { fechaHora: fecha }
        });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getAllCitas = async () => {
    try {
        const citas = await Cita.findAll();
        return citas;
    } catch (error) {
        throw error;
    }
};
