import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from './common/baseentity.entity.js';

@Entity( {
    tableName: 'entryusertoken'
})
export class EntryUserToken extends BaseEntity {

    @PrimaryKey({ name: "entryusertoken_uuid", type: "uuid" })
    override uuid = uuidv4();

    @Property( {name: "entryusertoken_createtime", type: Date} )
    override createtime =  new Date();    

    @Property( {name: "entryusertoken_updatetime", type: Date} )
    override updatetime = new Date();    

    @Property({ type: 'uuid', nullable: false })
    entryusertoken_giveawayuuid!: string;

    @Property( {length: 255, nullable: false} )
    entryusertoken_entryemail!: string;

    @Property( {type: 'uuid', nullable: true} )
    entryusertoken_confirmationuuid!: string;

    constructor(
        entryusertoken_giveawayuuid: string,
        entryusertoken_entryemail: string) {

        super();
        this.entryusertoken_giveawayuuid = entryusertoken_giveawayuuid;
        this.entryusertoken_entryemail = entryusertoken_entryemail;
      }    
}