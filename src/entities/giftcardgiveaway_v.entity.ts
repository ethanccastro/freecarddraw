import { Entity, OneToMany, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { Entry } from './entry.entity.js';

@Entity( {
    tableName: 'giftcardgiveaway_v'
})
export class GiftcardGiveaway_V {

    @Property( {length: 255, nullable: false} )
    giftcardgiveaway_v_giftcardtype!: string;

    @Property( {nullable: false} )
    giftcardgiveaway_v_giftcardvalue!: number;
    
    @Property( {length: 255, nullable: false} )
    giftcardgiveaway_v_giveawaybegindate!: string;
    
    @Property( {length: 255, nullable: false} )
    giftcardgiveaway_v_giveawayenddate!: string;
    
    @PrimaryKey( {length: 255, nullable: false} )
    giftcardgiveaway_v_giveawayuuid!: string;    
    
    @Property( {nullable: true} )
    giftcardgiveaway_v_giveawaynumber: number | null = null;

    @Property( {length: 255, nullable: false} )
    giftcardgiveaway_v_giveawaycode!: string;
    
    @Property( {length: 255, nullable: true} )
    giftcardgiveaway_v_giveawaypin!: string;         
    
    @Property( {length: 255, nullable: false} )
    giftcardgiveaway_v_TITLE!: string;
    
    @Property( {length: 255, nullable: false} )
    giftcardgiveaway_v_ID!: string;
    
    @Property( {length: 255, nullable: false} )
    giftcardgiveaway_v_IMAGE!: string;
    
    @Property( {length: 255, nullable: false} )
    giftcardgiveaway_v_URLTITLE!: string;

    @Property( {length: 255, nullable: false} )
    giftcardgiveaway_v_LINKTITLE!: string;

    @OneToMany(() => Entry, entry => entry.giftcardgiveaway_v)
    entries = new Collection<Entry>(this);
}