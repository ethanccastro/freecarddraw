import { Entity, ManyToOne, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from './common/baseentity.entity.js';
import { GiftcardGiveaway_V } from './giftcardgiveaway_v.entity.js';
import { Giveaway } from './giveaway.entity.js';
import { v4 as uuidv4 } from 'uuid';

@Entity( {
    tableName: 'entry'
})
export class Entry extends BaseEntity {

    @PrimaryKey({ name: "entry_uuid", type: "uuid" })
    override uuid = uuidv4();

    @Property( {name: "entry_createtime", type: Date} )
    override createtime =  new Date();    

    @Property( {name: "entry_updatetime", type: Date} )
    override updatetime = new Date();    

    @Property( {nullable: true} )
    entry_giveawaynumber: number | null = null;    

    @Property( {nullable: false} )
    entry_date!: Date;        

    @Property( {length: 255, nullable: false} )
    entry_email!: string;    

    @Property( {length: 255, nullable: false} )
    entry_name!: string;     

    @ManyToOne(() => GiftcardGiveaway_V, {
        referenceColumnName: 'giftcardgiveaway_v_giveawayuuid',
        fieldName: 'entry_giveawayuuid'
    })
    giftcardgiveaway_v!: GiftcardGiveaway_V;
    
    constructor(
        entry_date: Date,
        entry_email: string,
        entry_name: string,
        giftcardgiveaway_v: GiftcardGiveaway_V,
        giveaway?: Giveaway
    ) {

        super();
        this.entry_date = entry_date;
        this.entry_email = entry_email;
        this.entry_name = entry_name;
        this.giftcardgiveaway_v = giftcardgiveaway_v
      }        
}