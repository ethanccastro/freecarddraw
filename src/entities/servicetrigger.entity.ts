import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from './common/baseentity.entity.js';

@Entity( {
    tableName: 'servicetrigger'
})
export class ServiceTrigger extends BaseEntity {

    @PrimaryKey({ name: "servicetrigger_uuid", type: "uuid" })
    override uuid = uuidv4();

    @Property( {name: "servicetrigger_createtime", type: Date} )
    override createtime =  new Date();    

    @Property( {name: "servicetrigger_updatetime", type: Date} )
    override updatetime = new Date();    

    @Property( {length: 36, nullable: false} )
    servicetrigger_name!: string;

    @Property( {nullable: false} )
    servicetrigger_interval!: number;    

    @Property( {name: "servicetrigger_lastexecutedtime"} )
    servicetrigger_lastexecutedtime!: Date
}