-- CreateTable
CREATE TABLE
    "Admin" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "gender" "Gender" NOT NULL,
        "profilePicUrl" TEXT NOT NULL,
        "dateOfBirth" TIMESTAMP(3) NOT NULL,
        "phoneNumber" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "category" "Category" NOT NULL,
        "password" TEXT NOT NULL,
        "permanentAddress" TEXT NOT NULL,
        "currentAddress" TEXT NOT NULL,
        "city" TEXT NOT NULL,
        "state" TEXT NOT NULL,
        "pincode" TEXT NOT NULL,
        "country" TEXT NOT NULL,
        "universityEmail" TEXT NOT NULL,
        "universityEmailPassword" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
    );

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phoneNumber_key" ON "Admin" ("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_universityEmail_key" ON "Admin" ("universityEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_profilePicUrl_key" ON "Admin" ("profilePicUrl");


-- Statement 1
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Sarina Poe',
        'MALE',
        'https://images.unsplash.com/photo-1724614767087-3bd027d6ebc3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '2001-07-24 00:00:00',
        '91559-77372',
        'spoe0@chicagotribune.com',
        'ST',
        'eD1}C>U8kxf!Y',
        '40608 Eliot Alley',
        '6426 Cool"id"ge Junction',
        'Mumbai',
        'West Bengal',
        '038183',
        'IN',
        '3+@triplex.com',
        'hR7''~q7{',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 2
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Pembroke Kenna',
        'FEMALE',
        'https://images.unsplash.com/photo-1724593824060-2d984aa77f77?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '1930-08-18 00:00:00',
        '03109-56707',
        'pkenna1@printfriendly.com',
        'ST',
        'wO4>o/g{/7>~',
        '5596 Hovde Way',
        '70772 Thackeray Pass',
        'Hyderabad',
        'Nagaland',
        '199313',
        'IN',
        'i+@triplex.com',
        'kJ5+E"h3/',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 3
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Jessamyn Frankis',
        'FEMALE',
        'https://images.unsplash.com/photo-1724410343614-5283725bac7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '1991-05-02 00:00:00',
        '33623-67097',
        'jfrankis2@hao123.com',
        'ST',
        'oB4~t>tXt(o#"2U',
        '1 Golf Alley',
        '9966 Manley Parkway',
        'Surat',
        'Maharashtra',
        '047118',
        'IN',
        '7+@triplex.com',
        'hV6_I#}P>U|',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 4
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Merwin Killiam',
        'FEMALE',
        'https://images.unsplash.com/photo-1724086576041-34e434df9303?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '1978-06-20 00:00:00',
        '73332-74454',
        'mkilliam3@digg.com',
        'ST',
        'eR7`uVbUCYT`c',
        '00655 Dorton Plaza',
        '2 Tomscot Street',
        'Ahmedabad',
        'Maharashtra',
        '666352',
        'IN',
        'F+@triplex.com',
        'aC6+*1tXe#$',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 5
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Torie Luetchford',
        'FEMALE',
        'https://images.unsplash.com/photo-1723711183425-7d202944cff2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '1975-11-09 00:00:00',
        '39790-05526',
        'tluetchford4@gov.uk',
        'GENERAL',
        'pK3}ih#47',
        '6 Shoshone Park',
        '3050 Buena Vista Center',
        'Mumbai',
        'Andhra Pradesh',
        '200462',
        'IN',
        'h+@triplex.com',
        'lS0)"pAFM_>a',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 6
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Morena Ganders',
        'MALE',
        'https://images.unsplash.com/photo-1723619884686-622f9e51da54?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '1979-08-22 00:00:00',
        '07242-09417',
        'mganders5@imdb.com',
        'GENERAL',
        'oK9=ADz\e8M',
        '650 Annamark Avenue',
        '076 Emmet Terrace',
        'Hyderabad',
        'Nagaland',
        '200378',
        'IN',
        'kad+@triplex.com',
        'aT3_6{Nh@''DD>_d',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 7
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Martyn Wanek',
        'MALE',
        'https://images.unsplash.com/photo-1723581048670-bdd958641c2e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '1942-03-28 00:00:00',
        '28663-59316',
        'mwanek6@so-net.ne.jp',
        'ST',
        'rL1!Q}gNus76@g',
        '33508 Morningstar Lane',
        '2839 Logan Court',
        'Pune',
        'Chhattisgarh',
        '852766',
        'IN',
        '6+@triplex.com',
        'zY7"%uD3',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 8
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Dyna Defau',
        'FEMALE',
        'https://images.unsplash.com/photo-1723474549831-0d70d6c5f2b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '1982-01-01 00:00:00',
        '07102-69058',
        'ddefau7@histats.com',
        'OBC',
        'vK4~aS2&#''',
        '45815 V"id"on Court',
        '298 Bellgrove Hill',
        'Mumbai',
        'Jharkhand',
        '154881',
        'IN',
        '4+@triplex.com',
        'lW1{v.WnC=."',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 9
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Nicolais Ropartz',
        'FEMALE',
        'https://images.unsplash.com/photo-1723466394531-4e619a44c068?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '1962-04-06 00:00:00',
        '99729-48297',
        'nropartz8@last.fm',
        'GENERAL',
        'wJ2<Q_rLF+_gO',
        '31749 Maple Wood Plaza',
        '9 Fordem Terrace',
        'Surat',
        'Maharashtra',
        '118743',
        'IN',
        'c+@triplex.com',
        'dO4~U"f7>>#?',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 10
INSERT INTO
    "Admin" (
        "id",
        "name",
        "gender",
        "profilePicUrl",
        "dateOfBirth",
        "phoneNumber",
        "email",
        "category",
        "password",
        "permanentAddress",
        "currentAddress",
        "city",
        "state",
        "pincode",
        "country",
        "universityEmail",
        "universityEmailPassword",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Courtney Billows',
        'MALE',
        'https://images.unsplash.com/photo-1723451150479-3c99f94a9055?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3&q=85',
        '2002-01-10 00:00:00',
        '02814-71116',
        'cbillows9@hao123.com',
        'OBC',
        'xG9>a(wQD',
        '580 Shopko Hill',
        '2 Nancy Circle',
        'Pune',
        'Maharashtra',
        '095810',
        'IN',
        '2+@triplex.com',
        'oA3"N>bH.',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );