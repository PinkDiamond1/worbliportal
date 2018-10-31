"""empty message

Revision ID: e961b99f7486
Revises: 
Create Date: 2018-10-31 14:45:48.545135

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e961b99f7486'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('registration_requests',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('registration_code', sa.String(length=255), nullable=False),
    sa.Column('requested_on', sa.DateTime(), nullable=False),
    sa.Column('valid_until', sa.DateTime(), nullable=False),
    sa.Column('valid', sa.Boolean(), nullable=False),
    sa.Column('optin', sa.Boolean(), nullable=False),
    sa.Column('spent_on', sa.DateTime(), nullable=True),
    sa.Column('voided_on', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('registration_code')
    )
    op.create_table('snapshot_balances',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('account_name', sa.String(length=12), nullable=False),
    sa.Column('owner_key', sa.String(length=57), nullable=False),
    sa.Column('active_key', sa.String(length=57), nullable=False),
    sa.Column('total_nostake', sa.Float(), nullable=False),
    sa.Column('staked', sa.Float(), nullable=False),
    sa.Column('delegated', sa.Float(), nullable=False),
    sa.Column('total', sa.Float(), nullable=False),
    sa.Column('creation_time', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('account_name')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('registered_on', sa.DateTime(), nullable=False),
    sa.Column('location', sa.String(length=255), nullable=False),
    sa.Column('firstname', sa.String(length=255), nullable=False),
    sa.Column('lastname', sa.String(length=255), nullable=False),
    sa.Column('admin', sa.Boolean(), nullable=False),
    sa.Column('registration_request_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['registration_request_id'], ['registration_requests.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('airgrab_validation_requests',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('worbli_account_name', sa.String(length=12), nullable=False),
    sa.Column('worbli_owner_key', sa.String(length=57), nullable=False),
    sa.Column('worbli_active_key', sa.String(length=57), nullable=False),
    sa.Column('security_code', sa.String(length=64), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=False),
    sa.Column('snapshot_balance_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['snapshot_balance_id'], ['snapshot_balances.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('security_code'),
    sa.UniqueConstraint('worbli_account_name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('airgrab_validation_requests')
    op.drop_table('users')
    op.drop_table('snapshot_balances')
    op.drop_table('registration_requests')
    # ### end Alembic commands ###
