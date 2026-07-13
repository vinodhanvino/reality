from sqlalchemy import JSON, Boolean, Column, Integer, String
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    __table_args__ = (

        {'extend_existing': True},
    )

    id = Column(Integer, primary_key=True)
    phonenum = Column(String, nullable=False, unique=True, default=None)
    email = Column(String, nullable=True, unique=True, default=None)
    password = Column(String, nullable=False,)
    name = Column(String, nullable=True, default=None)
    address = Column(String, nullable=True, default=None)
    city = Column(String, nullable=True, default=None)
    country = Column(String, nullable=True, default=None)
    image = Column(String, nullable=True, default=None)

    deviceid = Column(String)
    role = Column(String, nullable=True, index=True)
    active = Column(Boolean, default=False)
    verified = Column(Boolean, default=False)
    archive = Column(Boolean, default=False)
    supervisor = Column(Boolean, default=False)
    token = Column(String)
    tags = Column(String, default='')
    more = Column(MutableDict.as_mutable(JSON), default={})
