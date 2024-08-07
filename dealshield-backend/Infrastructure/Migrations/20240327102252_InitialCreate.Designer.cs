﻿// <auto-generated />
using System;
using Infrastructure.Persistence.EntityFrameWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(DragonEscrowDbContext))]
    [Migration("20240327102252_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain.Bids.Bid", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("BidStatus")
                        .HasColumnType("int");

                    b.Property<Guid>("BidderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("OrderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ProposedAmount")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("Bids");
                });

            modelBuilder.Entity("Domain.Order.Order", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("AcceptedBidId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("AcceptedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("AllowedDays")
                        .HasColumnType("int");

                    b.Property<DateTime>("CompletionDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("ConsumerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Cost")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrderStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ProviderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Rated")
                        .HasColumnType("bit");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Order", (string)null);
                });

            modelBuilder.Entity("Domain.User.Consumer", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ConsumerId");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MobileNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("lowCostPreference")
                        .HasColumnType("int");

                    b.Property<int>("trustPref")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Consumers", (string)null);
                });

            modelBuilder.Entity("Domain.User.Provider", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ProviderId");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MobileNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RatingCount")
                        .HasColumnType("int");

                    b.Property<int>("TotalRating")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Providers", (string)null);
                });

            modelBuilder.Entity("Domain.Order.Order", b =>
                {
                    b.OwnsMany("Domain.Bids.BidId", "BidIds", b1 =>
                        {
                            b1.Property<Guid>("Value")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<Guid>("OrderId")
                                .HasColumnType("uniqueidentifier");

                            b1.HasKey("Value", "OrderId");

                            b1.HasIndex("OrderId");

                            b1.ToTable("Order-Bids", (string)null);

                            b1.WithOwner()
                                .HasForeignKey("OrderId");
                        });

                    b.Navigation("BidIds");
                });

            modelBuilder.Entity("Domain.User.Consumer", b =>
                {
                    b.OwnsMany("Domain.Order.ValueObjects.OrderId", "OrderIds", b1 =>
                        {
                            b1.Property<Guid>("Value")
                                .HasColumnType("uniqueidentifier")
                                .HasColumnName("Value");

                            b1.Property<Guid>("ConsumerId")
                                .HasColumnType("uniqueidentifier");

                            b1.HasKey("Value", "ConsumerId");

                            b1.HasIndex("ConsumerId");

                            b1.ToTable("Consumer_OrderId", (string)null);

                            b1.WithOwner()
                                .HasForeignKey("ConsumerId");
                        });

                    b.Navigation("OrderIds");
                });

            modelBuilder.Entity("Domain.User.Provider", b =>
                {
                    b.OwnsMany("Domain.Order.ValueObjects.OrderId", "AcceptedOrders", b1 =>
                        {
                            b1.Property<Guid>("Value")
                                .HasColumnType("uniqueidentifier")
                                .HasColumnName("Value");

                            b1.Property<Guid>("ProviderId")
                                .HasColumnType("uniqueidentifier");

                            b1.HasKey("Value", "ProviderId");

                            b1.HasIndex("ProviderId");

                            b1.ToTable("Provider_AcceptedOrderId", (string)null);

                            b1.WithOwner()
                                .HasForeignKey("ProviderId");
                        });

                    b.Navigation("AcceptedOrders");
                });
#pragma warning restore 612, 618
        }
    }
}
