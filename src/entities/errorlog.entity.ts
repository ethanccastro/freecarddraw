import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from './common/baseentity.entity.js';

@Entity( {
    tableName: 'errorlog'
})
export class ErrorLog extends BaseEntity {

    @PrimaryKey({ name: "errorlog_uuid", type: "uuid" })
    override uuid = uuidv4();

    @Property( {name: "errorlog_createtime", type: Date} )
    override createtime =  new Date();    

    @Property( {name: "errorlog_updatetime", type: Date} )
    override updatetime = new Date();    

    @Property( {length:250, nullable: true} )
    errorlog_file: string | null = null;

    @Property( {length:50, nullable: false} )
    errorlog_func!: string;    

    @Property( {length:4000, nullable: true} )
    errorlog_response!: string;        
}