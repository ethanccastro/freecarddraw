import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from './common/baseentity.entity.js';

@Entity( {
    tableName: 'giftcard'
})
export class Giftcard extends BaseEntity {

    @PrimaryKey({ name: "giftcard_uuid", type: "uuid" })
    override uuid = uuidv4();

    @Property( {name: "giftcard_createtime", type: Date} )
    override createtime =  new Date();    

    @Property( {name: "giftcard_updatetime", type: Date} )
    override updatetime = new Date();    

    @Property( {length: 255, nullable: false} )
    giftcard_type!: string;

    @Property( {nullable: false} )
    giftcard_value!: number;    

    constructor(
        giftcard_type: string,
        giftcard_value: number) {

        super();
        this.giftcard_type = giftcard_type;
        this.giftcard_value = giftcard_value;
      }        
}