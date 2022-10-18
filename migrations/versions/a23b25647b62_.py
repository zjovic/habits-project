"""empty message

Revision ID: a23b25647b62
Revises: f5d89951c7d0
Create Date: 2022-10-16 09:14:04.347662

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'a23b25647b62'
down_revision = 'f5d89951c7d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('todo', sa.Column('state', sa.Integer(), nullable=False))
    op.drop_column('todo', 'finished_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('todo', sa.Column('finished_at', postgresql.TIME(), autoincrement=False, nullable=True))
    op.drop_column('todo', 'state')
    # ### end Alembic commands ###