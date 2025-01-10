import { Table, Column, Model, DataType, HasMany, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Expense from './Esxpense'
import User from './User'

@Table({tableName: 'budget'})
class Budget extends Model {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    declare name:string

    @AllowNull(false)
    @Column({type: DataType.DECIMAL})
    declare amount:number

    @HasMany(()=>Expense,{onUpdate:'CASCADE',onDelete:'CASCADE'})
    declare expenses:Expense[]

    @ForeignKey(()=>User)
    declare userId:number

    @BelongsTo(()=>User)
    declare user:User
}

export default Budget