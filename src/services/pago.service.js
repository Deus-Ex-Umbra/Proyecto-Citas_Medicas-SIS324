import { Pago } from '../models/pago.js';
import { Cita } from '../models/cita.js';
import { Horario } from '../models/horario.js';
import { Medico } from '../models/medico.js';
import { sequelize } from '../database/database.js';

export const createPago = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const pago = await Pago.create(data, { transaction });
        const citaData = {
            fechaHora: data.fecha,
            estado: 'pendiente',
            descripcion: data.descripcion,
            tipoConsulta: 'Consulta general',
            formaPago: data.metodoPago,
            observacion: 'Sin observaciones',
            prioridad: 'normal',
            duracion: 30,
            ubicacion: 'consultorio',
            pacienteId: data.pacienteId,
            secretariaId: data.secretariaId,
            medicoId: data.medicoId,
            horarioId: data.horarioId
        };

        const cita = await Cita.create(citaData, { transaction });

        // Crear o actualizar el horario
        let horario = await Horario.findOne({
            where: {
                fecha: data.fecha,
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
                fecha: data.fecha,
                turno: 'Turno',
                estado: 'disponible',
                perfilId: data.medicoId
            }, { transaction });
        }

        // Actualizar estado de disponibilidad del horario
        horario.estado = 'no disponible';
        await horario.save({ transaction });

        // Asignar horarioId a la cita y guardar
        cita.horarioId = horario.id;
        await cita.save({ transaction });

        await transaction.commit();
        return pago;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getPagoById = async (id) => {
    try {
        const pago = await Pago.findByPk(id);
        return pago;
    } catch (error) {
        throw error;
    }
};

export const updatePago = async (id, data) => {
    const transaction = await sequelize.transaction();
    try {
        const pago = await Pago.findByPk(id, { transaction });
        if (!pago) {
            throw new Error('Pago no encontrado');
        }

        // Actualizar el pago
        await Pago.update(data, { where: { id }, transaction });

        // Actualizar la cita relacionada
        const cita = await Cita.findOne({ where: { descripcion: `Pago por cita ${id}` }, transaction });
        if (cita) {
            await Cita.update({
                costo: data.monto,
                fechaHora: data.fecha,
                formaPago: data.metodoPago,
                descripcion: data.descripcion
            }, { where: { id: cita.id }, transaction });
        }

        // Actualizar el horario
        let horario = await Horario.findOne({
            where: {
                fecha: data.fecha,
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
                fecha: data.fecha,
                turno: 'Turno',
                estado: 'disponible',
                perfilId: data.medicoId
            }, { transaction });
        }

        // Actualizar estado de disponibilidad del horario
        horario.estado = 'no disponible';
        await horario.save({ transaction });

        // Asignar horarioId a la cita y guardar
        cita.horarioId = horario.id;
        await cita.save({ transaction });

        await transaction.commit();
        return pago;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deletePago = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        await Pago.destroy({ where: { id }, transaction });
        await Cita.destroy({ where: { descripcion: `Pago por cita ${id}` }, transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
