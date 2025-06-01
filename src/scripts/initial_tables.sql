 CREATE TABLE giftcard (
    giftcard_uuid VARCHAR(36) PRIMARY KEY,
    giftcard_createtime datetime,
    giftcard_updatetime datetime,    
    giftcard_type VARCHAR(255) NOT NULL, -- e.g., "Robux 400", "Robux 800"
    giftcard_value INT NOT NULL -- Robux amount
);

-- Table: giveaways
CREATE TABLE giveaway (
    giveaway_uuid VARCHAR(36) PRIMARY KEY,
    giveaway_createtime datetime,
    giveaway_updatetime datetime,    
    giveaway_giftcarduuid VARCHAR(36),
    giveaway_begindate DATETIME NOT NULL,
    giveaway_enddate DATETIME,
    giveaway_number varchar(17)
);

-- Table: Entries
CREATE TABLE entry (
    entry_uuid VARCHAR(36) PRIMARY KEY,
    entry_createtime datetime,
    entry_updatetime datetime,        
    entry_giveawayuuid VARCHAR(36),
    entry_giveawaynumber int NULL, -- The number they are assigned for that giveaway
    entry_date DATETIME NOT NULL,
    entry_email VARCHAR(255),
    entry_name VARCHAR(255),
    UNIQUE KEY unique_entry (entry_email, entry_giveawayuuid) -- Ensures each user only enters once per giveaway
);
-- Table: Entries
CREATE TABLE entryusertoken (
    entryusertoken_uuid VARCHAR(36) PRIMARY KEY,
    entryusertoken_createtime datetime,
    entryusertoken_updatetime datetime,            
    entryusertoken_giveawayuuid VARCHAR(36),
    entryusertoken_entryemail VARCHAR(55),
    entryusertoken_confirmationuuid VARCHAR(36)
);

CREATE TABLE servicetrigger (
    servicetrigger_uuid VARCHAR(36) PRIMARY KEY,
    servicetrigger_createtime datetime NOT NULL,
    servicetrigger_updatetime datetime NOT NULL,    
    servicetrigger_name VARCHAR(36) NOT NULL,
    servicetrigger_interval INT NOT NULL,
    servicetrigger_lastexecutedtime datetime NOT NULL
);


CREATE OR REPLACE VIEW giftcardgiveaway_v AS
(                                                                                            
	SELECT
			giftcard_type AS giftcardgiveaway_v_giftcardtype
		,	giftcard_value AS giftcardgiveaway_v_giftcardvalue
        ,	giveaway_begindate AS giftcardgiveaway_v_giveawaybegindate
        ,	giveaway_enddate AS giftcardgiveaway_v_giveawayenddate
        ,	giveaway_uuid AS giftcardgiveaway_v_giveawayuuid
        ,	giveaway_number AS giftcardgiveaway_v_giveawaynumber
        ,	CONCAT('$', giftcard_value, ' ', giftcard_type, ' Gift Card giveaway (ID: ', UPPER(LEFT(giveaway_uuid, 8)), ')') AS giftcardgiveaway_v_TITLE
        ,	UPPER(LEFT(giveaway_uuid, 8)) AS giftcardgiveaway_v_ID
        ,	CONCAT(giftcard_type, '.png') AS giftcardgiveaway_v_IMAGE
        ,	LOWER(CONCAT('/', UPPER(LEFT(giveaway_uuid, 8)), '/', giftcard_value, '-', giftcard_type, '-gift-card-giveaway')) AS giftcardgiveaway_v_URLTITLE    
        ,	CONCAT(giftcard_value, '-', LOWER(giftcard_type), '-gift-card-giveaway') AS giftcardgiveaway_v_LINKTITLE
	FROM
		giftcard
        JOIN giveaway
			ON giftcard_uuid = giveaway_giftcarduuid
);


-- Example Data Insertion (Robux Gift Cards Only)

SET @_DATE = NOW();
-- Inserting Robux Gift Cards into the generic giftcards table
INSERT INTO giftcard (giftcard_uuid, giftcard_createtime, giftcard_updatetime, giftcard_type, giftcard_value) VALUES
ROW(uuid(),  @_DATE, @_DATE, 'Roblox', 5),
ROW(uuid(),  @_DATE, @_DATE, 'Roblox', 10),
ROW(uuid(),  @_DATE, @_DATE, 'Roblox', 15);

-- Inserting giveaway
INSERT INTO giveaway (giveaway_uuid, giveaway_createtime, giveaway_updatetime, giveaway_giftcarduuid, giveaway_begindate, giveaway_enddate, giveaway_number) VALUES
ROW(uuid(),  @_DATE, @_DATE, (SELECT giftcard_uuid FROM giftcard WHERE giftcard_value = 5), '2025-03-05 23:59:59', '2025-04-01 23:59:59', null),
ROW(uuid(),  @_DATE, @_DATE, (SELECT giftcard_uuid FROM giftcard WHERE giftcard_value = 10), '2025-03-10 23:59:59', '2025-04-03 23:59:59', null),
ROW(uuid(),  @_DATE, @_DATE, (SELECT giftcard_uuid FROM giftcard WHERE giftcard_value = 15), '2025-03-05 23:59:59', '2025-04-07 23:59:59', null);

-- Example entry Insertion
-- Assuming UserID = 1, giveawayID = 1, and the generated random number is 123
INSERT INTO entry (entry_uuid, entry_createtime, entry_updatetime, entry_giveawayuuid, entry_giveawaynumber, entry_date, entry_email) VALUES
ROW(uuid(),  @_DATE, @_DATE, (SELECT giveaway_uuid FROM giveaway LIMIT 1), 4, NOW(), 'example@email.com');

INSERT INTO servicetrigger (servicetrigger_uuid, servicetrigger_createtime, servicetrigger_updatetime, servicetrigger_name, servicetrigger_interval, servicetrigger_lastexecutedtime) VALUES
ROW('38c5a182-0dcb-4ce8-ac55-b8c2adb26910',  @_DATE, @_DATE, '30s', 30000, @_DATE);