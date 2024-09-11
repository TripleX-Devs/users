-- CreateTable
CREATE TABLE
    "Teacher" (
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
        "department" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
    );

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_phoneNumber_key" ON "Teacher" ("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_universityEmail_key" ON "Teacher" ("universityEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_profilePicUrl_key" ON "Teacher" ("profilePicUrl");

-- Statement 1
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Lana Harnwell',
        'MALE',
        'https://images.unsplash.com/photo-1668302785920-00972ac2b266?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NDl8&ixlib=rb-4.0.3',
        '2003-10-29 00:00:00',
        '72496-61241',
        'lharnwell0@usatoday.com',
        'ST',
        'nZ8`HK~aM<Cidxyq',
        '80076 Schlimgen Drive',
        '782 Briar Crest Park',
        'Surat',
        'Uttarakhand',
        '246681',
        'IN',
        '7+@triplex.com',
        'nQ7=Q*~UST',
        'Mathematics',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 2
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Adriena Cesconi',
        'MALE',
        'https://images.unsplash.com/photo-1720857018369-4bdc8a5b9c13?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NDl8&ixlib=rb-4.0.3',
        '1927-03-25 00:00:00',
        '55197-78109',
        'acesconi2@unc.edu',
        'ST',
        'rX8@OCWSq+sPh"',
        '531 Caliangt Place',
        '8603 Erie Trail',
        'Chennai',
        'Rajasthan',
        '960792',
        'IN',
        'h+@triplex.com',
        'fX3$7)EC',
        'Physics',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 3
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Emalee Cabbell',
        'MALE',
        'https://images.unsplash.com/photo-1721349086490-6d8b6fca778d?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NDl8&ixlib=rb-4.0.3',
        '1910-05-10 00:00:00',
        '24786-73551',
        'ecabbell3@blogs.com',
        'OBC',
        'sQ5..~qN1&.8Ehq',
        '95191 Carpenter Center',
        '98207 Tony Drive',
        'Surat',
        'Sikkim',
        '890831',
        'IN',
        '6+@triplex.com',
        'pO9%''z+*?''''',
        'Chemistry',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 4
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Adiana Petras',
        'MALE',
        'https://images.unsplash.com/photo-1721371216732-b57b8c25b3d7?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1911-08-05 00:00:00',
        '67099-31207',
        'apetras4@java.com',
        'OBC',
        'oD2"eDf*',
        '857 Stephen Road',
        '9048 Surrey Drive',
        'Mumbai',
        'Punjab',
        '416278',
        'IN',
        'tx+@triplex.com',
        'pO6|i>u{R%',
        'Biology',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 5
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Vere Mendes',
        'FEMALE',
        'https://images.unsplash.com/photo-1722152254540-691e14b6ee3a?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '2017-12-07 00:00:00',
        '36919-34357',
        'vmendes5@yolasite.com',
        'OBC',
        'aE3,cIWdi',
        '96924 Johnson Court',
        '966 Ronald Regan Court',
        'Kolkata',
        'Maharashtra',
        '217193',
        'IN',
        'i+@triplex.com',
        'nW6~xed/',
        'Computer Science',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 6
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Dew Drinkeld',
        'FEMALE',
        'https://images.unsplash.com/photo-1722172118908-1a97c312ce8c?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1921-11-05 00:00:00',
        '00780-14692',
        'ddrinkeld6@mapquest.com',
        'ST',
        'uQ6"="/yYValw)SS',
        '5551 Basil Street',
        '528 Nobel Alley',
        'Bangalore',
        'Bihar',
        '665976',
        'IN',
        'S+@triplex.com',
        'tH9_DNO\xr2\5KZu',
        'History',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 7
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Maiga Beverley',
        'FEMALE',
        'https://images.unsplash.com/photo-1722236479148-9dca1db69b72?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1927-06-21 00:00:00',
        '38629-48255',
        'mbeverley7@amazon.co.uk',
        'GENERAL',
        'uK7)z~BF',
        '5 7th Junction',
        '1 Delaware Circle',
        'New Delhi',
        'Jharkhand',
        '238203',
        'IN',
        'p+@triplex.com',
        'yR7_TF/$b+7',
        'Literature',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 8
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Xever Jeannon',
        'FEMALE',
        'https://images.unsplash.com/photo-1722249484039-9a16226b6e98?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '2015-02-06 00:00:00',
        '84002-54001',
        'xjeannon8@pagesperso-orange.fr',
        'GENERAL',
        'mR3''INEDVPCuvd',
        '74 Holmberg Way',
        '47347 Cottonwood Way',
        'Lucknow',
        'Gujarat',
        '634819',
        'IN',
        'o+@triplex.com',
        'uP9$)HNQ',
        'Philosophy',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 9
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Rowe Overland',
        'FEMALE',
        'https://images.unsplash.com/photo-1722776154198-c5113dc5d938?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1955-05-18 00:00:00',
        '83718-92320',
        'roverland9@ucoz.ru',
        'GENERAL',
        'hO1(fISDE',
        '42 Petterle Hill',
        '1 7th Avenue',
        'Hyderabad',
        'Assam',
        '523941',
        'IN',
        'y+@triplex.com',
        'wN3`WPJj',
        'Economics',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 10
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Alasteir Lesor',
        'MALE',
        'https://images.unsplash.com/photo-1723368298884-9f6c9146b127?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1964-01-26 00:00:00',
        '84705-62285',
        'alesora@cbc.ca',
        'OBC',
        'kP7"KQBW',
        '2 Center Road',
        '46 Ridgeview Pass',
        'Patna',
        'Himachal Pradesh',
        '145229',
        'IN',
        'e+@triplex.com',
        'tM9"8>H^A',
        'Political Science',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 11
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Lorilyn Langsbury',
        'MALE',
        'https://images.unsplash.com/photo-1724614767087-3bd027d6ebc3?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1928-03-14 00:00:00',
        '21327-24471',
        'llangsburyb@ow.ly',
        'ST',
        'lR8)P!OmJ?',
        '72454 Gulseth Pass',
        '88 Garrison Lane',
        'Ahmedabad',
        'Telangana',
        '341154',
        'IN',
        '4s+@triplex.com',
        'tW2>e|9@',
        'Mathematics',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 12
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Josephine Mawson',
        'FEMALE',
        'https://images.unsplash.com/photo-1724593824060-2d984aa77f77?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1904-11-11 00:00:00',
        '79636-87813',
        'jmawsonc@apple.com',
        'ST',
        'iG3)`d.oD',
        '29 Scott Park',
        '9 Anthes Way',
        'Surat',
        'Jharkhand',
        '115992',
        'IN',
        'eX9+@triplex.com',
        'dQ3=n|!<9"}Km"',
        'Physics',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 13
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Christie Bullier',
        'FEMALE',
        'https://images.unsplash.com/photo-1724410343614-5283725bac7a?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1987-11-29 00:00:00',
        '21747-45249',
        'cbullierd@wikimedia.org',
        'GENERAL',
        'wQ9\S6E.',
        '0994 Gale Hill',
        '521 Morningstar Pass',
        'Surat',
        'Andhra Pradesh',
        '040121',
        'IN',
        'Ks+@triplex.com',
        'zO2/*yVwA',
        'Chemistry',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 14
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Dore Colliard',
        'FEMALE',
        'https://images.unsplash.com/photo-1724086576041-34e434df9303?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1981-04-23 00:00:00',
        '08770-86323',
        'dcolliarde@forbes.com',
        'GENERAL',
        'lB7?Cx,OzoOh684=',
        '61811 School Court',
        '776 Transport Plaza',
        'Ahmedabad',
        'Madhya Pradesh',
        '034081',
        'IN',
        'r+@triplex.com',
        'xV8#1#4@zUtV)W0O',
        'Biology',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 15
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Brenda Johnigan',
        'FEMALE',
        'https://images.unsplash.com/photo-1723711183425-7d202944cff2?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1912-06-09 00:00:00',
        '07347-49780',
        'bjohniganf@edublogs.org',
        'ST',
        'jO4&vaTJWC',
        '67 Ryan Street',
        '0818 Meadow Vale Street',
        'Jaipur',
        'Uttar Pradesh',
        '864169',
        'IN',
        '0+@triplex.com',
        'qP0#8Gv3Q"gt&*Ys',
        'History',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 16
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Robinetta Valasek',
        'MALE',
        'https://images.unsplash.com/photo-1723619884686-622f9e51da54?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1965-03-15 00:00:00',
        '46974-34328',
        'rvalasekg@nymag.com',
        'SC',
        'mI5%@v1}CJ<_qY61',
        '22 Roxbury Junction',
        '08391 Memorial Park',
        'Jaipur',
        'Madhya Pradesh',
        '621524',
        'IN',
        'B+@triplex.com',
        'zJ3$<&JMAB&',
        'Economics',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 17
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Florinda Simoes',
        'FEMALE',
        'https://images.unsplash.com/photo-1723493271869-4d71c09c73e1?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1934-11-23 00:00:00',
        '39960-34908',
        'fsimoesh@webeden.co.uk',
        'GENERAL',
        'uS3#{5Oby8Pb',
        '8 Marcy Hill',
        '070 Troy Circle',
        'Vadodara',
        'Bihar',
        '902741',
        'IN',
        't+@triplex.com',
        'rW0(V9p}AY',
        'Sociology',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 18
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Erminie Baldin',
        'FEMALE',
        'https://images.unsplash.com/photo-1723438906614-83f7e2f0a238?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1974-06-22 00:00:00',
        '43688-26327',
        'ebaldini@pen.io',
        'SC',
        'tR2+()bOz"Z7RlmH',
        '29233 Norway Maple Lane',
        '80 Walton Junction',
        'Vadodara',
        'Andhra Pradesh',
        '972134',
        'IN',
        '4+@triplex.com',
        'cF6?H7',
        'Geography',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 19
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'John Langsbury',
        'MALE',
        'https://images.unsplash.com/photo-1723401940848-83f6b7f1f0b8?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1999-07-05 00:00:00',
        '31231-63183',
        'jlangsburyj@weather.com',
        'GENERAL',
        'rS8^[8P',
        '22 Sunset Drive',
        '09 Camden Pass',
        'Jaipur',
        'Karnataka',
        '876545',
        'IN',
        '4n+@triplex.com',
        'gT6!7yQ',
        'History',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 20
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Keenan Orhtmann',
        'MALE',
        'https://images.unsplash.com/photo-1723267810926-468a2f5f0d36?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '1976-09-13 00:00:00',
        '23983-14827',
        'korthmannk@jalbum.net',
        'GENERAL',
        'kW7}+D8W',
        '97184 Burning Wood Court',
        '2 Village Terrace',
        'Surat',
        'Odisha',
        '401223',
        'IN',
        '3+@triplex.com',
        'bN9&!Vv',
        'Political Science',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Statement 23
INSERT INTO
    "Teacher" (
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
        "department",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid (),
        'Ruthanne Drinkale',
        'FEMALE',
        'https://images.unsplash.com/photo-1723201969694-d47fd1b7fb61?ixid=M3w1MjIyMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5MjE3NTB8&ixlib=rb-4.0.3',
        '2021-04-26 00:00:00',
        '13313-69228',
        'rdrinkaleo@ucoz.ru',
        'ST',
        'sW6!tb{pf(&E!zH',
        '90763 Grim Park',
        '0 Carberry Parkway',
        'Mumbai',
        'Jharkhand',
        '376658',
        'IN',
        'Kf+@triplex.com',
        'mO8@+<yL2gN',
        'Physics',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );