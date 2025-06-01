import { OptionalProps, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export abstract class BaseEntity<Optional = never> {
    [OptionalProps]?:  'uuid' | 'createtime' | 'updatetime' | Optional

    @PrimaryKey({ type: 'uuid', nullable: false })
    uuid!: string;

    @Property( {type: Date, nullable: false} )
    createtime!: Date;

    @Property( {type: Date, nullable: false, onUpdate: () => new Date()} )
    updatetime!: Date;    
}