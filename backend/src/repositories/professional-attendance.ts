/* eslint-disable max-len */
import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { ProfessionalAttendance } from '../model/professional-attendance'

@EntityRepository(ProfessionalAttendance)
export default class ProfessionalAttendanceRepository
    extends Repository<ProfessionalAttendance> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<ProfessionalAttendance | undefined> {
        const repository = db
            ? db.getRepository(ProfessionalAttendance)
            : this

        return repository.findOne({ where: { id } })
    }

    async findAll(
        context: Context,
        evolutionRecordId: number
    ): Promise<ProfessionalAttendance[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                evolutionRecordId
            },
            relations: ['evolutionRecord', 'evolutionRecord.assisted' , 'user']
        })
    }

    async findAllByAttendance(
        userId: number,
        db?: EntityManager
    ): Promise<ProfessionalAttendance[] | undefined> {
        const repository = db
            ? db.getRepository(ProfessionalAttendance)
            : this

        return repository.find({
            where: { userId },
            relations: ['evolutionRecord', 'evolutionRecord.assisted']
        })
    }

    async findAllAttendanceByProfessional(
        context: Context,
        userId: number
    ): Promise<ProfessionalAttendance[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                userId
            },
            relations: ['evolutionRecord', 'evolutionRecord.assisted']
        })
    }

}
