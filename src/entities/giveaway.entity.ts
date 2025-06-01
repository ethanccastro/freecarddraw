import { Entity, OneToMany, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { Entry } from './entry.entity.js';
import { BaseEntity } from './common/baseentity.entity.js';
import { v4 as uuidv4 } from 'uuid';

@Entity( {
    tableName: 'giveaway'
})
export class Giveaway extends BaseEntity {

    @PrimaryKey({ name: "giveaway_uuid", type: "uuid" })
    override uuid = uuidv4();

    @Property( {name: "giveaway_createtime", type: Date} )
    override createtime =  new Date();    

    @Property( {name: "giveaway_updatetime", type: Date} )
    override updatetime = new Date();    

    @Property( {type: 'uuid', nullable: false} )
    giveaway_giftcarduuid!: string;

    @Property( {nullable: false} )
    giveaway_begindate!: Date;

    @Property( {nullable: false} )
    giveaway_enddate!: Date;

    @Property( {nullable: true} )
    giveaway_number: number | null = null;

    constructor(
        giveaway_giftcarduuid: string,
        giveaway_begindate: Date,
        giveaway_enddate: Date,
        giveaway_number: number) {

        super();
        this.giveaway_giftcarduuid = giveaway_giftcarduuid;
        this.giveaway_begindate = giveaway_begindate;
        this.giveaway_enddate = giveaway_enddate;
        this.giveaway_number = giveaway_number;
      }        
}